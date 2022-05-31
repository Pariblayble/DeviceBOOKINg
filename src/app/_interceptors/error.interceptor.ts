import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../routes/auth/auth.service';
import {NotifierService} from "angular-notifier";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private readonly notifier: NotifierService) {
  }

  intercept(request: HttpRequest<never>, next: HttpHandler): Observable<HttpEvent<void>> {
    return next.handle(request).pipe(catchError(err => {
      const error = err.error.message || err.statusText;
      if (err.status === 401) {
        this.notifier.notify('info', error || 'Ошибка авторизации');
        this.authService.logOut();
      }
      return throwError(error);
    }))
  }
}
