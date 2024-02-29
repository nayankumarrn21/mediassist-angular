import { Policy } from './policy';

export interface UserPolicy {
  id: string;
  startedDate: string;
  endingDate: string;
  beneficiaries: any[];
  nominee: string;
  userId?: number;
  policy?: Policy;
}
