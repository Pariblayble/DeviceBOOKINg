import {Component, Input, OnInit} from '@angular/core';

import {IDevice} from '../../../interfaces/interfaces';

@Component({
  selector: 'app-category-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss'],
})
export class DeviceCardComponent implements OnInit {
  @Input() device!: IDevice;

  ngOnInit(): void {
  }
}
