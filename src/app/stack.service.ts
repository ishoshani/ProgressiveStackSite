import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { interval, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Stacker, StackView } from 'src/util/Stacker';

@Injectable({
  providedIn: 'root'
})
export class StackService {

  room = "";
  baseURL = "http://127.0.0.1:5000/"
  nextPart = "pop"

  private intervalTime: number = 3000
  private stackObservable: Observable<StackView>;
  constructor(private httpClient: HttpClient) { }

  stackCheck(): Observable<StackView>{
    return this.httpClient.get<StackView>(`${this.baseURL}${this.room}`)
  }
  startStackConnection(room: string):void{
    this.room = room;
    this.stackObservable = interval(this.intervalTime).pipe(
      switchMap(() => this.stackCheck())
    );
  }
  getStackObservable():Observable<StackView>{
    return this.stackObservable;
  }
  putOnStack(stacker: Stacker):Observable<void>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    const option = {
      headers:headers
    }
    const body = JSON.stringify(stacker);
    return this.httpClient.post<void>(`${this.baseURL}${this.room}/add`, body, option ).pipe(
      catchError(this.handleError)
    )
  }

  putOnDR(stacker: Stacker):Observable<void>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    const option = {
      headers:headers
    }
    const body = JSON.stringify(stacker);
    return this.httpClient.post<void>(`${this.baseURL}${this.room}/addDR`, body, option ).pipe(
      catchError(this.handleError)
    )
  }

  nextOnStack():Observable<void>{
    return this.httpClient.get<void>(`${this.baseURL}${this.room}/${this.nextPart}`)
  }

  nextOnDR():Observable<void>{
    return this.httpClient.get<void>(`${this.baseURL}${this.room}/${this.nextPart}DR`)
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
  }
