import { Injectable } from '@angular/core';
import { Policy } from '../interfaces/policy';

@Injectable({
  providedIn: 'root',
})
export class PoliciesService {
  policiesList: Array<any> = [
    {
      id: 1,
      title: 'Privacy Policy',
      insuredAmount: '2cr',
      companyName: 'Tata Corporation',
      beneficiariesList: [
        'self',
        'spouse',
        'mother',
        'father',
        'daughter',
        'son',
        'others',
      ],
      description:
        'Get cover till age 85 & Protection against Income Loss | Option to Skip Premium for a year. Now secure your family & also cover yourself against 64 critical illnesses till age 85. 30 Day Return Option. Hassle Free Process. Accident Cover. Affordable Premium. 99.51% Settlement Ratio. Cover 64 Critical Illness.',
    },
    {
      id: 2,
      title: 'Reliance Insurance Policy',
      companyName: 'Reliance',
      beneficiariesList: [
        'self',
        'spouse',
        'mother',
        'father',
        'daughter',
        'son',
        'others',
      ],
      insuredAmount: '18lk',
      description:
        ' This health insurance plan gives healthcare protection for an individual as well as a family under a single sum insured. It offers a wide range of sum insured from Rs. 3 lakh to Rs. 18 lakh. The plan offers coverage to people from the age of 3 months to 65 years with a lifelong renewability option. The features of this plan include in-patient treatment, pre-hospitalisation and post-hospitalisation costs, donor expenses, day care procedures, etc. It gives a cumulative bonus with a 33.3% increase in the sum insured for every claim-free year maximum up to 100%.',
    },
  ];

  constructor() {}

  createPolicy(policy: {
    title: String;
    companyName: String;
    beneficiariesList: any[] | null;
    insuredAmount: String;
    description: String;
  }): void {
    this.policiesList.push({ ...policy, id: this.policiesList.length + 1 });
  }

  getAllPolicies(): any[] {
    return this.policiesList;
  }

  getPolicyData(id: string): Policy {
    return this.policiesList.filter((p) => p.id == id)[0];
  }
}
