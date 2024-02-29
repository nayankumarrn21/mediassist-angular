import { UserPolicy } from './user-policy';

export interface User {
  userName: string;
  password: string;
  phNumber: number;
  fullName: string;
  gender: string;
  dob: string;
  workType: string;
  policies?: UserPolicy[];
  role?: String;
  profilePath?: string;
  token?: string;
  id?: Number;
}
