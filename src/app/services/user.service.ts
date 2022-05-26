import {Injectable} from "@angular/core";
import {JwtService} from "./jwt.service";
import {IUser} from "../interfaces/interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../routes/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  accessToken!: string;

  constructor(private jwtService: JwtService, private http: HttpClient, private authService: AuthService) {
    this.authService.currentUser.subscribe(x => {
      this.accessToken = x!.accessToken;
    })
  }

  getUser(): Observable<IUser> {
    const payload = this.jwtService.decode<{ id: number }>(this.accessToken);
    return this.http
      .get<IUser>('http://localhost:3000/users/' + payload!.id, {
        headers: {
          authorization: `Bearer ${this.accessToken}`,
        },
      });
  }
}
