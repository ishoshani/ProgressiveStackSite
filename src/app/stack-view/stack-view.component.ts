import { AsyncPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PRIMARY_OUTLET, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Profile } from 'src/util/Profile';
import { Stacker, StackView } from 'src/util/Stacker';
import { ProfileService } from '../profile.service';
import { RoomService } from '../room.service';
import { StackService } from '../stack.service';

@Component({
  selector: 'app-stack-view',
  templateUrl: './stack-view.component.html',
  styleUrls: ['./stack-view.component.scss']
})
export class StackViewComponent implements OnInit {
  list:Observable<StackView> = new Observable<StackView>();
  room:string = "";
  title:string = "connecting";
  sizeOfStack=2;

  user:Profile = {name:"",tags:[]}
  constructor(private router:Router,
    private roomService: RoomService,
    private stackService: StackService,
    private profileService: ProfileService) { }
  
  async goOnStack() {
    console.log("I'm on stack! Where is everyone?");
    console.log("posting to stack "+this.room);
    await this.stackService.putOnStack({name: this.user.name, tags: this.user.tags}).toPromise();
  }

  async goOnDR(){
    console.log("Directly Responding")
    await this.stackService.putOnDR({name:this.user.name, tags: this.user.tags}).toPromise();
  }
  
  ngOnInit(): void {
    const urlTree:UrlTree = this.router.parseUrl(this.router.url);
    const segments = urlTree.root.children[PRIMARY_OUTLET].segments;
    console.log(segments[1].toString())
    this.room = segments[1].toString();
    this.roomService.getRoom(this.room).then((answer) => {
      this.title=answer.title;
    })
    this.stackService.startStackConnection(this.room);
    this.list = this.stackService.getStackObservable();
    this.user = this.profileService.getProfile();
  }


}
