import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../routes/auth/auth.service';
import {IUser, IUserCredentials} from '../../interfaces/interfaces';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  public currentUser!: IUserCredentials | null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(["/login"]);
  }
}
