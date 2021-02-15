import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, of, Subject } from 'rxjs';
import { pointRange, Tag } from 'src/util/Tag';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-roombuilder',
  templateUrl: './roombuilder.component.html',
  styleUrls: ['./roombuilder.component.scss']
})
export class RoombuilderComponent implements OnInit {

  room: string = "";
  title: string = "";
  tags: Tag[] = [];
  tags_subject : Subject<Tag[]> = new Subject<Tag[]>()
  building: boolean = true;
  constructor(
    private router:Router,
    private roomService:RoomService
  ) {
    this.tags_subject.next(this.tags);
   }

  async generateRoom(){
    if(this.isValidRoomName(this.title)){
      try{
      this.room = await this.roomService.makeRoom(this.title,this.tags)
      this.building = false;
      }catch (e){
        console.error("failed to make room: "+e)
      }
      
    }
  }

  addTag(name:string,points:pointRange){
    this.tags.push({name, points})
    this.tags_subject.next(this.tags);
  }

  removeTag(removeTag:Tag){
    this.tags = this.tags.filter((tag) => tag!=removeTag);
    this.tags_subject.next(this.tags);

  }

  isValidRoomName(name: String){
    //toDO, do an actual check
    return name!="";
  }

  ngOnInit(): void {
    
  }

}
