import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export interface IUser{
    id: number,
    name: string,
    secondName: string,
    email: string,
    password: string
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    public loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[\w.]+@\w+\.(?:com|ru|org|ua|net|by|edu|info)')]),
      password: new FormControl('', Validators.required)
    })
  
  constructor(private _http: HttpClient, private _router: Router) { }

  ngOnInit(): void {
    
  }

  public onSubmit() {
    this._http.get<IUser[]>("http://localhost:3000/users")
    .subscribe((x: IUser[]) => {
        const user: IUser | undefined = x.find((a: IUser) => {
            return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
        });
        if (user) {
            this._router.navigate(['hui/' + user.id]);
        } else {
            alert('user not found');
        }
    }, () => {
        alert('Error');
    });
  }

}
