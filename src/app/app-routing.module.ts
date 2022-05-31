import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './routes/auth/auth.component';
import {AuthGuard} from './routes/auth/auth.guard';
import {CategoriesComponent} from './routes/categories/categories.component';
import {ProfileComponent} from './routes/profile/profile.component';
import {CategoryComponent} from "./routes/category/category.component";
import {DeviceComponent} from "./routes/device/device.component";

const routes: Routes = [
  {path: 'login', component: AuthComponent},
  {
    path: 'device/:slug', component: DeviceComponent, canActivate: []
  },
  {
    path: 'category/:slug', component: CategoryComponent, canActivate: []
  },
  {
    path: 'categories', component: CategoriesComponent, canActivate: []
  },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
