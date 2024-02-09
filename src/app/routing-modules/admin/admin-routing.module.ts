import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../components/menus/home/home.component';
import { UsersComponent } from '../../components/menus/users/users.component';
import { UserProfileComponent } from '../../components/shared/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'allusers',
    component: UsersComponent,
  },
  {
    path: 'profile',
    component: UserProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
