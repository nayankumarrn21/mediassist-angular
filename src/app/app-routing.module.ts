import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { HomeComponent } from './components/layout/home/home.component';
import { PoliciesComponent } from './components/policy/policies/policies.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { UsersComponent } from './components/layout/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { isLogin: true } },
  { path: 'home', component: HomeComponent },
  { path: 'policies', component: PoliciesComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'allusers', component: UsersComponent },
];
console.log('Routing working');

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
