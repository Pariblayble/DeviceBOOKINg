import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
