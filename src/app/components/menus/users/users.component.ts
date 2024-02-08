import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  public users: User[];
  constructor(private userService: UsersService) {
    this.users = this.userService
      .getUsers()
      .filter((user) => user.role === 'user');
  }

  filterdUser(value: any) {
    console.log('filter User', value);
    this.users = this.userService
      .getUsers()
      .filter(
        (user) =>
          (user.fullName.toLowerCase().includes(value.toLowerCase()) ||
            user.username.toLowerCase().includes(value.toLowerCase())) &&
          user.role === 'user'
      );
    console.log(this.users);
  }
}
