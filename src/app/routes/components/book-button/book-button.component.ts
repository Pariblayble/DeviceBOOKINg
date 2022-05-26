import {Component, Input, OnInit, TemplateRef} from '@angular/core';

import {IBookedDevice, IDevice} from '../../../interfaces/interfaces';
import {NgbCalendar, NgbDate, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../auth/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {JwtService} from "../../../services/jwt.service";
import {BookingService} from "../../../services/booking.service";

type BookOmitDevice = Omit<IBookedDevice, 'device'>

@Component({
  selector: 'app-book-button',
  templateUrl: './book-button.component.html',
  styleUrls: ['./book-button.component.scss'],
})
export class BookButtonComponent implements OnInit {
  @Input() device!: IDevice;
  @Input() type: string = "sm";
  public bookForm!: FormGroup;
  userId!: number;
  errorMessage: PickError | undefined = PickError.PickBoth;
  hoveredDate: NgbDate | null = null;
  fromDate!: NgbDate;
  toDate: NgbDate | null = null;
  isBooked: boolean = false;
  bookedDevices: BookOmitDevice[] = [];

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private jwtService: JwtService,
    private bookingService: BookingService,
    public calendar: NgbCalendar
  ) {
    this.authService.currentUser.subscribe((x) => {
      const payload = jwtService.decode<{ id: number }>(x!.accessToken);
      this.userId = payload.id;
    })
  }

  ngOnInit(): void {
    this.bookedDevices = this.device?.bookedDevices?.sort((x, y) => (x === y) ? 0 : x ? -1 : 1) || [];
    this.isBooked = Boolean(this.bookedDevices.find(x => x.userId === this.userId && !x.isEnded));
    this.bookForm = new FormGroup({
      needCharge: new FormControl(false, [Validators.required]),
      cumments: new FormControl(''),
      id: new FormControl(),
    });
  }

  public onSubmit() {
    const toDate = this.toDate as NgbDate;
    const data: BookOmitDevice = {
      id: 0,
      userId: this.userId,
      comments: this.bookForm.value.cumments,
      needCharge: this.bookForm.value.needCharge,
      deviceId: this.device.id,
      fromDate: new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day).getTime(),
      toDate: new Date(toDate.year, toDate.month, toDate.day).getTime(),
      isEnded: false,
    };
    this.bookingService.bookDevice(data).subscribe(() => {
      this.isBooked = true;
      this.bookedDevices = [...this.bookedDevices, data];
      this.modalService.dismissAll();
    });
  }

  isDisabled = (date: NgbDate, current?: { year: number; month: number; } | undefined) => {
    const bookedDevices = this.bookedDevices;
    for (const x of bookedDevices!) {
      const currentDate = new Date(date.year, date.month, date.day).getTime();
      if ((currentDate >= x.fromDate) && (currentDate <= x.toDate)) {
        return x.isEnded != true;
      }
    }
    return false;
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      const bookedDevices = this.bookedDevices;
      for (const x of bookedDevices!) {
        const currentDate = new Date(x.fromDate);
        const b = new NgbDate(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        if (this.fromDate.before(b) && date.after(b)) {
          this.errorMessage = PickError.AlreadyPicked;
          this.fromDate = date;
          return
        }
      }
      this.errorMessage = undefined;
      this.toDate = date;
    } else {
      this.toDate = null;
      this.errorMessage = PickError.PickBoth;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    if (this.isDisabled(date, date)) {
      return false;
    }
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


enum PickError {
  PickBoth = "Выберите дату начала и конца бронирования",
  AlreadyPicked = "На данный промежуток нельзя забронировать устройство"
}
