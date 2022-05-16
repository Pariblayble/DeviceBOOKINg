import {HttpClient} from '@angular/common/http';
import {Component, OnInit, TemplateRef} from '@angular/core';
import {ICategory, IDevice, User} from '../interfaces/interfaces';
import {
  NgbModal,
  NgbCalendar,
  NgbDate,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {updateDevice} from "../../services/device.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories!: ICategory[];
  bookForm!: FormGroup;
  currentUser!: User;
  dataLoaded = false;
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  currentId?: number;

  constructor(
    private _http: HttpClient,
    private modalService: NgbModal,
    private authService: AuthService,
    calendar: NgbCalendar
  ) {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x!));
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
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

  public onSubmit() {
    return updateDevice(this.currentId!, {
        bookData: {
          comments: this.bookForm.value.cumments,
          needCharge: this.bookForm.value.needCharge,
          fromDate: new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day).getTime(),
          toDate: this.toDate ? new Date(this.toDate.year, this.toDate.month, this.toDate.day).getTime() : undefined,
        },
        userId: this.currentUser.id,
      },
      this.currentUser.accessToken!,
      (d) => {
        let deviceIndex = -1;
        let card = this.categories.find((x) => {
          deviceIndex = x.devices.findIndex(x => x.id === d.id);
          return deviceIndex !== -1;
        });
        let index = this.categories.indexOf(card!);
        this.categories[index].devices[deviceIndex] = d;
      },
      this._http
    )
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  open(content: TemplateRef<any>, id: number) {
    this.currentId = id;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }
}
