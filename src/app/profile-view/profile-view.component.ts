import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { Subject } from 'rxjs';
import { RoomDesc } from 'src/util/RoomDesc';
import { Tag } from 'src/util/Tag';
import { Profile } from '../../util/Profile';
import { ProfileService } from '../profile.service';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: Profile = {name:"",tags:[]}
  title: string = "";
  @Input('room') room: string;
  @Input('facilitator') facilitator: boolean = false
  availableTags: Tag[];
  tagStyles: Subject<string>[];

  
  constructor(private router:Router,
    private profileService:ProfileService,
    private roomService:RoomService) { }

  
  async ngOnInit(): Promise<void> {
    const roomDesc : RoomDesc = await this.roomService.getRoom(this.room)
    this.availableTags = roomDesc.tags;
    this.tagStyles = this.availableTags.map(tag => {
      const sub = new Subject<string>();
      sub.next("black");
      return sub;
    })
    this.title = roomDesc.title;
  };

  ProfileComplete(): void{
    this.profileService.setProfile(this.user);
    if(this.facilitator){
      this.router.navigate([`/stack/${this.room}/facilitator`])
      return;
    }
    this.router.navigate([`/stack/${this.room}`])
  }
  tagToggle(clickedTag:Tag): void{
    if(this.user.tags.includes(clickedTag)){
      this.user.tags = this.user.tags.filter((tag)=> clickedTag.name != tag.name)
      const index = this.availableTags.indexOf(clickedTag);
      this.tagStyles[index].next("black")
    }else{
      this.user.tags.push(clickedTag);
      const index = this.availableTags.indexOf(clickedTag);
      this.tagStyles[index].next("red")
    }

  }
  getTagColor(tag:Tag){
    const index = this.availableTags.indexOf(tag);
    return this.tagStyles[index];
  }


}
