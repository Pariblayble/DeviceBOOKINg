import {HttpClient} from '@angular/common/http';
import {Component, OnInit, TemplateRef} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {IBookingData, IDevice, User} from '../interfaces/interfaces';
import {updateDevice} from "../../services/device.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentCards!: IDevice[];
  currentUser: User = {
    name: '',
    email: '',
    id: 0,
    password: '',
    secondName: '',
    accessToken: '',
  };

  constructor(private authService: AuthService,
              private _http: HttpClient,
              private modalService: NgbModal) {
    this.authService.currentUser.subscribe((x) => {
      this.currentUser = x!;
    });

  }

  append(id: number) {
    return updateDevice(id, {},
      this.currentUser.accessToken!,
      () => {
        this.currentCards = this.currentCards.filter(x => x.id !== id);
      },
      this._http
    )
  }

  remove(id: number) {
    return updateDevice(id!, {
        ownerId: null,
        bookData: {
          comments: "",
          toDate: null,
          needCharge: false,
          fromDate: null,
        }
      },
      this.currentUser.accessToken!,
      () => {
        this.currentCards = this.currentCards.filter(x => x.id !== id);
      },
      this._http
    )
  }

  ngOnInit(): void {
    this._http
      .get<IDevice[]>('http://localhost:3000/devices', {
        headers: {
          authorization: `Bearer ${this.currentUser.accessToken}`,
        },
      })
      .subscribe((x: IDevice[]) => {
        this.currentCards = x.filter((x) => x.ownerId === this.currentUser.id);
      });
  }

  open(content: TemplateRef<any>, id: number) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }
}
