import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { IDevice } from '../interfaces/interfaces';
import {
  NgbModal,
  NgbCalendar,
  NgbDate,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss'],
})
export class DeviceCardComponent implements OnInit {
  currentCards!: IDevice[];
  public bookForm!: FormGroup;

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  constructor(
    private _http: HttpClient,
    private modalService: NgbModal,
    private calendar: NgbCalendar,
    private authService : AuthService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      needCharge: new FormControl(false, [Validators.required]),
      cumments: new FormControl(''),
      id: new FormControl(0, [Validators.required]),
    });

    const b = JSON.parse(localStorage.getItem('currentUser') as string);
    this._http
      .get<IDevice[]>('http://localhost:3000/devices', {
        headers: {
          authorization: `Bearer ${b.accessToken}`,
        },
      })
      .subscribe((x: IDevice[]) => {
        this.currentCards = x;
      });
  }

  public onSubmit(cardId: number) {
    const b = JSON.parse(localStorage.getItem('currentUser') as string);

    return this._http
      .get<IDevice>('http://localhost:3000/devices/' + cardId, {
        headers: {
          authorization: `Bearer ${b.accessToken}`,
        },
      })
      .subscribe((res: IDevice) => {
        res.isBooked = true;
        res.bookData = {
          userId: this.authService.currentUserValue?.id,
          comments: this.bookForm.value.cumments,
          needCharge: this.bookForm.value.needCharge,
          fromDate: this.fromDate,
          toDate: this.toDate,
        };
        return this._http
          .put('http://localhost:3000/devices/' + cardId, res, {
            headers: {
              authorization: `Bearer ${b.accessToken}`,
            },
          })
          .subscribe((res: any) => {
            location.reload();
          });
      });
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

  open(content: TemplateRef<any>) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }
}
