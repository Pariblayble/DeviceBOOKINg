import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from "@angular/router";
import {ICategory, IDevice, User} from '../../interfaces/interfaces';
import {AuthService} from '../auth/auth.service';
import {fakeDevice} from "../../_skeleton/device-card";


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  category!: ICategory;
  public bookForm!: FormGroup;
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
    this.titleService.setTitle('Категория');
    this.authService.currentUser.subscribe((x) => (this.currentUser = x!));
  }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      needCharge: new FormControl(false, [Validators.required]),
      cumments: new FormControl(''),
      id: new FormControl(),
    });

    const b = JSON.parse(localStorage.getItem('currentUser') as string);
    this._http
      .get<ICategory[]>('http://localhost:3000/categories?slug=' + this.route.snapshot.paramMap.get('slug') + '&_embed=devices', {
        headers: {
          authorization: `Bearer ${b.accessToken}`,
        },
      })
      .subscribe((x: ICategory[]) => {
        if (x[0] === undefined) {
          this.router.navigate(['categories']);
        } else {
          this.category = x[0];
          this.titleService.setTitle(this.category.title);
          this.dataLoaded = true;
        }
      });
  }
}
