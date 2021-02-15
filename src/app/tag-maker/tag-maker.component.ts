import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { pointRange, Tag } from 'src/util/Tag';

@Component({
  selector: 'app-tag-maker',
  templateUrl: './tag-maker.component.html',
  styleUrls: ['./tag-maker.component.scss']
})
export class TagMakerComponent implements OnInit {
  tag: string;
  points: pointRange = 0;
  @Output() tagDone = new EventEmitter<Tag>();
  constructor() { }
  
  finishTag(){
    if(this.tag == null){
      return;
    }
    this.tag = this.tag.trim();
    if(this.tag != ""){
      this.tagDone.emit({name:this.tag,points:this.points});
    }
  }
  ngOnInit(): void {
  }

}
