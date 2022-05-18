import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ICategory, User} from '../../interfaces/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {Title} from '@angular/platform-browser';
import {fakeDevice} from "../../_skeleton/device-card";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories!: ICategory[];
  public bookForm!: FormGroup;
  currentUser!: User;
  dataLoaded = false;
  fakeDevice = fakeDevice;

  constructor(
    private _http: HttpClient,
    private authService: AuthService,
    private titleService: Title,
  ) {
    this.titleService.setTitle('Все устройства');
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
      .get<ICategory[]>('http://localhost:3000/categories?_embed=devices', {
        headers: {
          authorization: `Bearer ${b.accessToken}`,
        },
      })
      .subscribe((x: ICategory[]) => {
        this.categories = x;
        this.dataLoaded = true;
      });
  }
}
