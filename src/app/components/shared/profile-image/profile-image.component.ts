import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../../interfaces/user';
import { loggedInUser } from '../../../store/auth/auth.selector';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrl: './profile-image.component.css',
})
export class ProfileImageComponent implements AfterViewInit {
  imageUrl: string | null = null;

  @Input()
  profileObj: {
    width: string;
    height: string;
    lineheight: string;
    fontSize: string;
    username?: string | null;
  } | null = null;
  imageStyle: any = null;
  placeHolderStyle: any = null;

  @ViewChild('profilePlaceHolder', { read: ElementRef })
  profilePlaceHolder!: ElementRef<HTMLButtonElement>;

  constructor(private store: Store) {}
  ngAfterViewInit(): void {
    console.log('My Image oBj', this.profileObj);
    if (this.profileObj?.username) {
      this.profilePlaceHolder.nativeElement.innerText =
        this.profileObj?.username.substring(0, 2).toUpperCase() || '';
    }
    if (this.profileObj?.username) {
      this.imageUrl = localStorage.getItem(this.profileObj?.username);
    }
    this.imageStyle = {
      width: this.profileObj?.width,
      height: this.profileObj?.height,
      'line-height': this.profileObj?.lineheight,
      'font-size': this.profileObj?.fontSize,
    };
    this.placeHolderStyle = {
      width: this.profileObj?.width,
      height: this.profileObj?.height,
      'line-height': this.profileObj?.lineheight,
      'font-size': this.profileObj?.fontSize,
    };
  }
}
