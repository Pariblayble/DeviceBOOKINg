import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from "@angular/router";

import {IDevice, User} from "../../interfaces/interfaces";
import {AuthService} from "../auth/auth.service";
import { fakeDevice } from '../../_skeleton/device-card';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {
  device!: IDevice;
  currentUser!: User;
  dataLoaded = false;
  fakeDevice: IDevice = fakeDevice;

  constructor(
    private _http: HttpClient,
    private authService: AuthService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.titleService.setTitle('Устройство');
    this.authService.currentUser.subscribe((x) => (this.currentUser = x!));
  }

  ngOnInit(): void {
    const b = JSON.parse(localStorage.getItem('currentUser') as string);
    this._http
      .get<IDevice[]>('http://localhost:3000/devices?slug=' + this.route.snapshot.paramMap.get('slug') + '&_expand=category', {
        headers: {
          authorization: `Bearer ${b.accessToken}`,
        },
      })
      .subscribe((x: IDevice[]) => {
        if (x[0] === undefined) {
          this.router.navigate(['categories']);
        } else {
          this.device = x[0];
          this.titleService.setTitle(this.device.title);
          this.dataLoaded = true;
        }
      });
  }
}
