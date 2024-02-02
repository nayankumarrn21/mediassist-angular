import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UsersService } from '../../../services/users.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/auth/auth.reducer';
import * as AuthActions from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {
  title = 'medi-assists';
  showFiller = false;

  currentRoute: string = '';
  loggedInUser: any;

  constructor(
    private router: Router,
    private userService: UsersService,
    private store: Store<AuthState>
  ) {
    this.loggedInUser = userService.getLoggedInUser();
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }
}
