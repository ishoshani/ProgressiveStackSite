import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Tag } from 'src/util/Tag';
import { RoomDesc } from 'src/util/RoomDesc';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  baseURL = "http://127.0.0.1:5000/"
  newRoomPart = "newRoom"
  getRoomPart = "desc"
  constructor(
    private http: HttpClient
  ) { }

  async makeRoom(title: string, tags: Tag[]): Promise<string> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    const option = {
      headers:headers
    }
    const body = JSON.stringify({title, tags});
    return this.http.post<string>(`${this.baseURL}${this.newRoomPart}`,body, option).toPromise();
  }
  async getRoom(roomCode: string): Promise<RoomDesc>{
    return this.http.get<RoomDesc>(`${this.baseURL}${roomCode}/${this.getRoomPart}`).toPromise();

  }
}
