import {Component, OnInit, TemplateRef} from '@angular/core';
import {IBookedDevice, IUser, IUserCredentials} from '../../interfaces/interfaces';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {UserService} from "../../services/user.service";
import {BookingService} from "../../services/booking.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  credentials!: IUserCredentials;
  currentCards!: IBookedDevice[];
  deviceHistory!: IBookedDevice[];
  isCardsLoaded = false;
  isProfileLoaded = false;
  currentUser: IUser = {
    name: '',
    email: '',
    id: 0,
    secondName: '',
    avatarUrl: '',
  };

  constructor(
    private userService: UserService,
    private bookingService: BookingService,
    private modalService: NgbModal,
    private titleService: Title,
  ) {
  }


  ngOnInit(): void {
    this.userService.getUser().subscribe((user: IUser) => {
      this.currentUser = user;
      this.isProfileLoaded = true;
      this.titleService.setTitle('Профиль ' + this.currentUser.email);
    });
    this.bookingService.getBookedUser().subscribe(x => {
      this.currentCards = x.filter(x => !x.isEnded);
      this.deviceHistory = x.filter(x => x.isEnded);
      this.isCardsLoaded = true;
    });
  }

  remove = (id: number) => {
    const bookedDevice = this.currentCards.find(x => x.id === id);
    this.currentCards = this.currentCards.filter(x => x.id !== id);
    this.deviceHistory = [...this.deviceHistory, bookedDevice!];
    return this.bookingService.endBook(id!).subscribe();
  }


  open(content: TemplateRef<void>) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }
}
