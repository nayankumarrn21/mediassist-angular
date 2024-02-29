import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, debounceTime, map, startWith } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrl: './user-filter.component.css',
})
export class UserFilterComponent {
  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  users: User[] = [];

  @Output('userSearchString')
  userSearchString = new EventEmitter<string | null>();

  constructor(private userService: UsersService) {
    // this.users = this.userService
    //   .getUsers()
    //   .filter((user) => user.role === 'user');
    this.userService.getAllUsers().subscribe((users) => {
      console.log(users);
      this.users = users;
      this.options = this.users.map((user) => user.fullName);
      console.log('this.options', this.options);
    });
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.myControl.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      console.log('value', value);
      this.userSearchString.emit(value);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
