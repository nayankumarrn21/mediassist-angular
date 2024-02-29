import { Injectable } from '@angular/core';
import { Policy } from '../interfaces/policy';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PoliciesService {
  constructor(private http: HttpClient) {}

  createPolicy(policy: {
    title: String;
    companyName: String;
    beneficiariesList: any[] | null;
    insuredAmount: String;
    description: String;
  }) {
    return this.http.post('policy', policy);
  }

  // getAllPolicies(): any[] {
  //   return this.policiesList;
  // }

  // getPolicyData(id: string): Policy {
  //   return this.policiesList.filter((p) => p.id == id)[0];
  // }

  getPolicyData(id: string) {
    return this.http.get<Policy[]>('policy/' + id);
  }
  getAllPoliciesFromDb() {
    return this.http.get<Policy[]>('policy/list');
  }

  getUsersPoliciesFromDb(id: any) {
    return this.http.get<any[]>('user-policy/user/' + id);
  }
}
