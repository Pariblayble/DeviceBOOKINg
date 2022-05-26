import {Component, OnInit} from '@angular/core';
import {ICategory, IDevice, IUserCredentials} from '../../interfaces/interfaces';
import {Title} from '@angular/platform-browser';
import {fakeDevice} from "../../_skeleton/device-card";
import {CategoryService} from "../../services/category.service";
import {DeviceService} from "../../services/device.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories!: ICategory[];
  currentUser!: IUserCredentials;
  dataLoaded = false;
  fakeDevice = fakeDevice;
  devices: { [key: string]: IDevice[]; } = {};

  constructor(
    private titleService: Title,
    private categoryService: CategoryService,
    private deviceService: DeviceService
  ) {
    this.titleService.setTitle('Все устройства');
    this.categoryService
      .getAllCategories()
      .subscribe((categories: ICategory[]) => {
        this.categories = categories;
        categories.forEach((category, index) => {
          this.deviceService.getDevicesByCategoryId(category.id, 1, 4).subscribe(x => {
            this.devices[category.id] = x;
            if (index == categories.length - 1) {
              this.dataLoaded = true;
            }
          });
        })
      });
  }

  ngOnInit(): void {

  }
}
