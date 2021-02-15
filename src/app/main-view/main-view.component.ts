import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stacker } from 'src/util/Stacker';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  room : String = "";
  mode: ("init" | "host" | "guest") = "init"
  constructor(
    private roomService: RoomService,
    public router: Router
  ) { }

  hostMode(){
    this.mode = "host";
  }

  guestMode(){
    this.mode = "guest";
  }

  ngOnInit(): void {
  }

}
