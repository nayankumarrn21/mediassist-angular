import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  users: User[] = [];
  originalUsers: User[] = [];
  constructor(private userService: UsersService) {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      console.log(users);
      this.users = users;
      this.originalUsers = users;
    });
  }

  filterdUser(value: any) {
    console.log('filter User', value);
    this.users = this.originalUsers.filter(
      (user) =>
        user.fullName.toLowerCase().includes(value.toLowerCase()) ||
        user.userName.toLowerCase().includes(value.toLowerCase())
    );
    console.log(this.users);
  }
}
