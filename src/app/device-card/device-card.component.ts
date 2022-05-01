import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CardElement, User } from '../interfaces/interfaces';

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss'],
})
export class DeviceCardComponent implements OnInit {
  currentCard!: CardElement[];

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    const b = JSON.parse(localStorage.getItem('currentUser') as string);
    this._http
      .get<CardElement[]>('http://localhost:3000/devices', {
        headers: {
          authorization: `Bearer ${b.accessToken}`,
        },
      })
      .subscribe((x: CardElement[]) => {
        this.currentCard = x;
      });
  }
}
