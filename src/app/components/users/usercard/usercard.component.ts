import { Component, Input } from '@angular/core';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrl: './usercard.component.css',
})
export class UsercardComponent {
  @Input()
  user!: User;
  randomImage: string = '';
  panelOpenState = false;

  constructor() {}

  ngOnInit() {
    console.log('Usercard', this.user);
    this.randomImage = `https://randomuser.me/api/portraits/med/men/${this.getTheId(
      this.user.username
    )}.jpg`;
  }

  hashCode(str: String): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return hash;
  }

  getTheId(value: String): number {
    const id = Math.abs(this.hashCode(value));
    return (id % 100) + 1;
  }
}
