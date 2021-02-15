import { Component } from '@angular/core';
import { trigger, state, transition, style, animate, query, keyframes } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('newcard',[
      transition('* => *', [
        query(':enter', style({opacity:0}), {optional = true})
        query(':enter', animate('1s ease-in', keyframes[
          style({opacity: 0, transform: 'translateY(-50%)', offset:0}),
          style({opacity: 0, transform: 'translateY(-50%)', offset:0}),
        ])
      ])
    ]
  ]
})
export class AppComponent {
  title = 'Progressive Stack';
}
