import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import * as AuthSelector from '../store/auth/auth.selector';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  loggenIdInUser: User | null = null;
  url = 'http://localhost:9090';

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.loggenIdInUser || !this.loggenIdInUser.token) {
      let clone = req.clone({
        url: `${this.url}/${req.url}`,
        headers: req.headers
          .append('custom', 'key')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', '*')
          .append(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, OPTIONS'
          ),
      });
      return next.handle(clone);
    }
    let modifier = req.clone({
      url: `${this.url}/${req.url}`,
      headers: req.headers
        .append('Authorization', `Bearer ${this.loggenIdInUser?.token}`)
        .append('custom', 'key')
        .append('Access-Control-Allow-Origin', '*')
        .append('Access-Control-Allow-Headers', '*')
        .append(
          'Access-Control-Allow-Methods',
          'GET, POST, PUT, DELETE, OPTIONS'
        ),
    });
    return next.handle(modifier);
  }

  constructor(private store: Store<any>) {
    this.store.select(AuthSelector.loggedInUser).subscribe((user) => {
      this.loggenIdInUser = user;
    });
  }
}
