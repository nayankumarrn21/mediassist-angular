import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth/auth.reducer';
import * as AuthActions from '../store/auth/auth.actions';
import { loggedInUser } from '../store/auth/auth.selector';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserPolicy } from '../interfaces/user-policy';
import { HttpClient } from '@angular/common/http';
import { Policy } from '../interfaces/policy';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  usersList: Array<User> = [
    {
      userName: 'nayan@gmail.com',
      password: 'password',
      phNumber: 900000000,
      fullName: 'Administrator',
      dob: '2023-01-01',
      gender: 'Male',
      workType: 'Information Technology',
      role: 'admin',
    },
    {
      userName: 'user',
      password: 'user',
      phNumber: 9888888888,
      fullName: 'User John',
      dob: '2023-01-01',
      role: 'user',
      gender: 'Male',
      workType: 'Biotechnology',
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
      userName: 'ben@gmail.com',
      password: 'ben',
      phNumber: 9888888888,
      fullName: 'Ben Smith',
      dob: '2023-01-01',
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

  constructor(private store: Store<AuthState>, private http: HttpClient) {
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
      return users.filter((user) => user.userName === username)[0] || null;
    }
    return null;
  }

  updateUser(user: User) {
    if (user) {
      this.http
        .put(`users/${user.id}`, user)
        .subscribe((data) => console.log(data));
    }
  }

  updateUserPolicy(userPolicy: UserPolicy, user?: User): string {
    console.log('Inside the updateUser', user);
    const usersJson = localStorage.getItem('users');
    const existingPolicy = user?.policies?.filter(
      (p) => p.id === userPolicy.id
    );
    if (existingPolicy && existingPolicy.length) {
      return 'policy already by the user';
    }

    if (usersJson) {
      let users: User[] = JSON.parse(usersJson);
      users = users.map((u) => {
        if (user && u.userName === user.userName) {
          if (u.policies) {
            u.policies.push(userPolicy);
          } else {
            u.policies = [userPolicy];
          }
          this.store.dispatch(AuthActions.updatLoggedInUser({ user: u }));
        }
        return u;
      });
      localStorage.setItem('users', JSON.stringify(users));

      return 'User Bought the policy Successfullly';
    } else {
      return 'Failed to Buy the Policy';
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`login`, { username, password });
  }

  register(user: User) {
    return this.http.post<any>(`register`, user);
  }
  getAllUsers() {
    return this.http.get<User[]>('users/list');
  }

  addUserPolicy(userPolicy: UserPolicy, user?: User, policy?: Policy) {
    let userPolicyDB = {
      userPolicyDetails: userPolicy,
      policyId: policy?.id,
      userId: user?.id,
    };
    return this.http.post<any>('user-policy', userPolicyDB);
  }
}
