import {HttpClient} from "@angular/common/http";
import {IBookedDevice} from "../interfaces/interfaces";
import {Injectable} from "@angular/core";
import {AuthService} from "../routes/auth/auth.service";
import {JwtService} from "./jwt.service";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  accessToken!: string;
  ownerId!: number;

  constructor(private authService: AuthService, private http: HttpClient, private jwtService: JwtService) {
    this.authService.currentUser.subscribe(x => {
      this.accessToken = x?.accessToken || '';
      if (this.accessToken) {
        const {id} = this.jwtService.decode<{ id: number }>(x!.accessToken);
        this.ownerId = id;
      }
    })
  }

  endBook(id: number) {
    return this.http
      .patch<IBookedDevice[]>('http://localhost:3000/bookedDevices/' + id, {
        isEnded: true,
      })
  }

  getBookedUser() {
    return this.http
      .get<IBookedDevice[]>('http://localhost:3000/bookedDevices?_expand=device&userId=' + this.ownerId, {})
  }

  bookDevice(data: Omit<IBookedDevice, 'device'>) {
    return this.http
      .post('http://localhost:3000/bookedDevices?', data)
  }
}
