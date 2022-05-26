import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from "@angular/router";
import {ICategory, IDevice} from '../../interfaces/interfaces';
import {fakeDevice} from "../../_skeleton/device-card";
import {CategoryService} from "../../services/category.service";
import {DeviceService} from "../../services/device.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  category!: ICategory;
  devices!: IDevice[];
  categoryLoaded = false;
  devicesLoaded = false;

  limit = 8;
  page = 1;
  showLoadMoreButton = true;
  showLoadMoreSkeleton = false;

  fakeDevice: IDevice = fakeDevice;

  constructor(
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private deviceService: DeviceService,
  ) {
    this.titleService.setTitle('Категория');
  }

  ngOnInit(): void {
    this.categoryService.getCategoryBySlug(
      this.route.snapshot.paramMap.get('slug')!
      ).subscribe((x: ICategory[]) => {
      if (x[0] === undefined) {
        this.router.navigate(['categories']);
      } else {
        this.category = x[0];
        this.titleService.setTitle(this.category.title);
        this.categoryLoaded = true;
        this.deviceService.getDevicesByCategoryId(this.category.id, this.page, this.limit).subscribe(x => {
          if (x.length < this.limit) {
            this.showLoadMoreButton = false;
          }
          this.devices = x;
          this.devicesLoaded = true;
        });
      }
    });
  }

  loadMore() {
    this.showLoadMoreSkeleton = true;
    this.page += 1;
    this.deviceService.getDevicesByCategoryId(this.category.id, this.page, this.limit).subscribe(x => {
      this.showLoadMoreSkeleton = false;
      if (x.length < this.limit) {
        this.showLoadMoreButton = false;
      }
      return this.devices = [...this.devices, ...x];
    });
  }
}
