import {CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './routes/auth/auth.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ErrorInterceptor} from './_interceptors/error.interceptor';

import {JwtInterceptor} from './_interceptors/jwt.interceptor';
import {NavMenuComponent} from './components/nav-menu/nav-menu.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CategoriesComponent} from './routes/categories/categories.component';
import {ProfileComponent} from './routes/profile/profile.component';
import {CategoryComponent} from "./routes/category/category.component";
import {DeviceCardComponent} from "./routes/components/device-card/device-card.component";
import {DeviceComponent} from "./routes/device/device.component";
import {BookButtonComponent} from "./routes/components/book-button/book-button.component";
import {BookedCardComponent} from "./routes/components/booked-card/booked-card.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GlobalErrorHandler} from "./handlers/error.handler";
import {NotifierModule, NotifierOptions} from "angular-notifier";
import { ZoomDirective } from './directives/zoom.directive';

const notifierDefaultOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12,
    },
    vertical: {
      position: 'top',
      distance: 30,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: false,
    stacking: 3,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 400,
      easing: 'ease',
    },
    hide: {
      preset: 'slide',
      speed: 500,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    CategoryComponent,
    AuthComponent,
    NavMenuComponent,
    ProfileComponent,
    CategoriesComponent,
    DeviceCardComponent,
    DeviceComponent,
    BookButtonComponent,
    DeviceCardComponent,
    BookedCardComponent,
    ZoomDirective
  ],
  imports: [
    NotifierModule.withConfig(notifierDefaultOptions),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
