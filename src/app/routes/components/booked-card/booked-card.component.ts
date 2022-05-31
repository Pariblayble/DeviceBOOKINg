import {Component, HostBinding, Input, OnInit, TemplateRef} from '@angular/core';
import {IBookedDevice, IUser, IUserCredentials} from '../../../interfaces/interfaces';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-booked-card',
  templateUrl: './booked-card.component.html',
  styleUrls: ['./booked-card.component.scss'],
  animations: [trigger("hiddingTrigget", [
    state('opened', style({
      opacity: 1,
    })),
    state('closed', style({
      opacity: 0,
    })),
    transition('opened => closed', [
      animate('0.2s')
    ])
  ])]
})
export class BookedCardComponent implements OnInit {
  public animationState: string = 'opened';

  @Input()
  booked!: IBookedDevice;

  @Input()
  remove!: (id: number) => void;

  removeWithAnimation(id: number) {
    this.animationState = 'closed';
    const promise = new Promise((resolve) => {
      setTimeout(resolve, 200);
    });
    promise.then(() => this.remove(id));
  }

  constructor() {
  }


  ngOnInit(): void {
  }
}
