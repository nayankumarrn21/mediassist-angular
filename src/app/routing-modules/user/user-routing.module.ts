import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from '../../components/users/user-home/user-home.component';
import { UserProfileComponent } from '../../components/users/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: 'home',
    component: UserHomeComponent,
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
export class UserRoutingModule {}
