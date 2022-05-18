import { Component, Input, OnInit, TemplateRef } from '@angular/core';

import { IDevice, User } from '../../../interfaces/interfaces';
import { HttpClient } from "@angular/common/http";
import { NgbCalendar, NgbDate, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../auth/auth.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { updateDevice } from "../../../../services/device.service";


@Component({
    selector: 'app-book-button',
    templateUrl: './book-button.component.html',
    styleUrls: ['./book-button.component.scss'],
})
export class BookButtonComponent implements OnInit {
    @Input() device!: IDevice;
    @Input() type: string = "sm";
    public bookForm!: FormGroup;
    currentUser!: User;
    hoveredDate: NgbDate | null = null;
    fromDate: NgbDate;
    toDate: NgbDate | null = null;

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
    }

    public onSubmit() {
        return updateDevice(this.device.id!, {
            bookData: {
                userId: this.currentUser.id,
                comments: this.bookForm.value.cumments,
                needCharge: this.bookForm.value.needCharge,
                fromDate: new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day).getTime(),
                toDate: this.toDate ? new Date(this.toDate.year, this.toDate.month, this.toDate.day).getTime() : undefined,
            },
        },
            this.currentUser.accessToken!,
            (d) => {
                this.device = d;
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

    open(content: TemplateRef<any>) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
        });
    }

}
