import { Component, Input, OnInit } from '@angular/core';
import { Stacker } from 'src/util/Stacker';

@Component({
  selector: 'app-stack-card',
  templateUrl: './stack-card.component.html',
  styleUrls: ['./stack-card.component.css']
})
export class StackCardComponent implements OnInit {

  @Input() stacker:Stacker;
  @Input() facilitator = false;

  constructor() { }

  ngOnInit(): void {
  }

}
