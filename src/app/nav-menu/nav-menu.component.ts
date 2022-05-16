import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../interfaces/interfaces';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent{
    public currentUser!: User | null;

    constructor (
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
