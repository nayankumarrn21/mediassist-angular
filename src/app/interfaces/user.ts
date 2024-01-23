import { UserPolicy } from './user-policy';

export interface User {
  username: string;
  password: string;
  phNumber: number;
  fullName: string;
  gender: string;
  dob: string;
  workType: string;
  policies?: UserPolicy[];
  role?: String;
}
