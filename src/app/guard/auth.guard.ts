import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const user = new UsersService();
  if (user.getLoggedInUser()) {
    return true;
  }
  return inject(Router).navigate(['/login']);
};
