import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../routes/auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(
    request: HttpRequest<never>,
    next: HttpHandler
  ): Observable<HttpEvent<void>> {
    let currentUser = this._authService.currentUserValue;
    if (currentUser && currentUser.accessToken) {
      request = request.clone({
        setHeaders: {
          authorization: `Bearer ${currentUser.accessToken}`,
        },
      });
      console.log(request)
    }

    return next.handle(request);
  }
}
