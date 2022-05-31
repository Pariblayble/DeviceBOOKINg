import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {NotifierService} from "angular-notifier";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private readonly notifier: NotifierService, private zone: NgZone) {
  }

  public handleError(error: Error): void {
    this.zone.run(() => {
      this.notifier.notify('info', 'Непредвиденная ошибка');
    });
    console.error('Error catched:', error);
  }
}
