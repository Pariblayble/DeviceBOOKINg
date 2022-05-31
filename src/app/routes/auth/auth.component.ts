import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public loginForm!: FormGroup;
  private returnUrl!: string;

  private isRequestFailed = false;

  get isEmailInvalid() {
    return this.loginForm.controls['email'].invalid && this.loginForm.controls['email'].touched || this.isRequestFailed;
  }

  get isPasswordInvalid() {
    return this.loginForm.controls['password'].invalid && this.loginForm.controls['password'].touched || this.isRequestFailed;
  }


  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService
  ) {
    if (this._authService.currentUserValue) {
      this._router.navigate(['categories']);
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

    this.returnUrl =
      this._route.snapshot.queryParams['returnUrl'] || '/categories';
  }

  public onSubmit() {
    this._authService
  .logIn(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(first())
      .subscribe(
        (data) => {
          this.isRequestFailed = false;
          this._router.navigate([this.returnUrl]);
        },
        (error) => {
          this.isRequestFailed = true;
        }
      );
  }
}
