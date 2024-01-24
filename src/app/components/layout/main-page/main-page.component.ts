import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UsersService } from '../../../services/users.service';

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

  constructor(private router: Router, private userService: UsersService) {
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
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
