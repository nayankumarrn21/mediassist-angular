import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UsersService } from '../../../services/users.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/auth/auth.reducer';
import * as AuthActions from '../../../store/auth/auth.actions';
import { SessionTimerComponent } from '../../shared/session-timer/session-timer.component';

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

  @ViewChild(SessionTimerComponent)
  sessionTimer = {} as SessionTimerComponent;

  loginTime = new Date();

  profileObj = {
    width: '40px',
    height: '40px',
    lineheight: '40px',
    username: 'NN',
    fontSize: '1.5rem',
  };

  constructor(
    private router: Router,
    private userService: UsersService,
    private store: Store<AuthState>
  ) {
    this.loggedInUser = userService.getLoggedInUser();
    this.profileObj = {
      width: '40px',
      height: '40px',
      lineheight: '40px',
      username: this.loggedInUser.username,
      fontSize: '1.5rem',
    };
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  ngAfterViewInit() {
    this.sessionTimer.startSessionTimer();
  }

  ngDestroy() {
    this.sessionTimer.stopSessionTimer();
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }
}
