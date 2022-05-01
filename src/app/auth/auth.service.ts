import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>
  constructor(private _http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') as string));
      this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User | null {
       return this.currentUserSubject.value
   }

   public logIn(email: string, password: string): Observable<User> {
        return this._http.post<any>('http://localhost:3000/auth/login', { email, password })
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user))
                this.currentUserSubject.next(user)
                return user;
            }))
   }

   public logOut() {
       localStorage.removeItem("currentUser");
       this.currentUserSubject.next(null);
   }
}
