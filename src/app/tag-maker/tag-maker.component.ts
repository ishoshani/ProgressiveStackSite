import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { pointRange, Tag } from 'src/util/Tag';

@Component({
  selector: 'app-tag-maker',
  templateUrl: './tag-maker.component.html',
  styleUrls: ['./tag-maker.component.css']
})
export class TagMakerComponent implements OnInit {
  tag: string;
  points: pointRange = 0;
  @Output() tagDone = new EventEmitter<Tag>();
  constructor() { }
  
  setPoints(points: pointRange){
    this.points = points;
  }
  
  finishTag(){
    this.tagDone.emit({name:this.tag,points:this.points});
  }
  ngOnInit(): void {
  }

}
