import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { HomeComponent } from './components/menus/home/home.component';
import { PoliciesComponent } from './components/policy/policies/policies.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { UsersComponent } from './components/menus/users/users.component';
import { authGuard } from './guard/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { isLogin: true } },
  { path: 'policies', component: PoliciesComponent },
  { path: 'register', component: RegisterUserComponent },

  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () =>
      import('../app/components/routing-modules/admin/admin.module').then(
        (m) => m.AdminModule
      ),
  },
  {
    path: 'user',
    canActivate: [authGuard],
    loadChildren: () =>
      import('../app/components/routing-modules/user/user.module').then(
        (m) => m.UserModule
      ),
  },
  { path: '**', component: NotFoundComponent },
];
console.log('Routing working');

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
