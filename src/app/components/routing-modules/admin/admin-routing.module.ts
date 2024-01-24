import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../menus/home/home.component';
import { UsersComponent } from '../../menus/users/users.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'allusers',
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
