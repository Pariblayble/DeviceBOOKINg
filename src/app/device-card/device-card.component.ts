import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardElement } from '../app.component';


@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss']
})
export class DeviceCardComponent implements OnInit{
  currentCard!: CardElement[];

  constructor(private _http: HttpClient, private _router: Router) { }

  ngOnInit(): void {
    this._http.get<CardElement[]>("http://localhost:3000/devices")
    .subscribe((x: CardElement[]) => {
      this.currentCard = x
      });
  }
}
