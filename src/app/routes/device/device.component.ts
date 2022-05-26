import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from "@angular/router";

import {IDevice} from "../../interfaces/interfaces";
import {fakeDevice} from '../../_skeleton/device-card';
import {DeviceService} from "../../services/device.service";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {
  device!: IDevice;
  dataLoaded = false;
  fakeDevice: IDevice = fakeDevice;

  constructor(
    private titleService: Title,
    private deviceService: DeviceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.titleService.setTitle('Устройство');
  }

  ngOnInit(): void {
    this.deviceService.getDeviceBySlug(this.route.snapshot.paramMap.get('slug')!, ['category'])
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
