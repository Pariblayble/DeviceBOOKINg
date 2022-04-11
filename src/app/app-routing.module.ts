import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DeviceCardComponent } from './device-card/device-card.component';

const routes: Routes = [
    {path: '', component: AuthComponent},
    {path: 'hui/:id', component: DeviceCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
