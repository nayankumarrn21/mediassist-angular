import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrl: './usercard.component.css',
})
export class UsercardComponent implements AfterViewInit {
  @Input()
  user!: User;
  randomImage: string | null = null;
  panelOpenState = false;

  @ViewChild('profilePlaceHolder', { read: ElementRef })
  profilePlaceHolder!: ElementRef<HTMLButtonElement>;

  constructor() {}
  ngAfterViewInit() {
    this.profilePlaceHolder.nativeElement.innerText = this.user.username
      .substring(0, 2)
      .toUpperCase();
  }

  ngOnInit() {
    console.log('Usercard', this.user);
    if (this.user && localStorage.getItem(this.user.username)) {
      this.randomImage = localStorage.getItem(this.user.username);
    }
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
