import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth/auth.reducer';
import { loggedInUser } from '../store/auth/auth.selector';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  usersList: Array<User> = [
    {
      username: 'admin',
      password: 'admin',
      phNumber: 900000000,
      fullName: 'Administrator',
      dob: '01/01/1990',
      gender: 'Male',
      workType: 'Information Technology',
      role: 'admin',
    },
    {
      username: 'user',
      password: 'user',
      phNumber: 9888888888,
      fullName: 'User',
      dob: '01/01/1990',
      role: 'user',
      gender: 'Male',
      workType: 'Docter',
      policies: [
        {
          id: '1',
          startedDate: '2023-01-01',
          endingDate: '2024-10-01',
          beneficiaries: ['mother'],
          nominee: 'son',
        },
      ],
    },
    {
      username: 'user@gmail.com',
      password: 'user',
      phNumber: 9888888888,
      fullName: 'User',
      dob: '01/01/1990',
      role: 'user',
      gender: 'Male',
      workType: 'Docter',
      policies: [
        {
          id: '2',
          startedDate: '2023-01-01',
          endingDate: '2024-10-01',
          beneficiaries: ['father', 'mother'],
          nominee: 'son',
        },
      ],
    },
  ];

  loggedUser: User | null = null;

  constructor(private store: Store<AuthState>) {
    const usersList = localStorage.getItem('users');
    if (!usersList) {
      localStorage.setItem('users', JSON.stringify(this.usersList));
    }
    this.store
      .select(loggedInUser)
      .subscribe((data) => (this.loggedUser = data));
  }

  getLoggedInUser(): User | null {
    return this.loggedUser;
  }

  addUser(user: User) {
    this.usersList.push(user);
    const usersJson = localStorage.getItem('users');
    if (usersJson) {
      let users: User[] = JSON.parse(usersJson);
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      console.log(users);
    }
  }

  getUsers(): Array<User> {
    const usersJson = localStorage.getItem('users');
    return usersJson ? JSON.parse(usersJson) : [];
  }

  getUser(username: String): User | null {
    const usersJson = localStorage.getItem('users');
    if (usersJson) {
      const users: User[] = JSON.parse(usersJson);
      return users.filter((user) => user.username === username)[0] || null;
    }
    return null;
  }
}
