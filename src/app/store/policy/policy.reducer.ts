import { inject } from '@angular/core';
import { PoliciesService } from '../../services/policies.service';
import { createReducer, on } from '@ngrx/store';
import * as PolicyAction from '../policy/policy.actions';
import { Policy } from '../../interfaces/policy';

export const intialPolicyList: Policy[] = [
  // {
  //   id: '1',
  //   title: 'Privacy Policy',
  //   insuredAmount: '2cr',
  //   companyName: 'Tata Corporation',
  //   beneficiariesList: [
  //     'self',
  //     'spouse',
  //     'mother',
  //     'father',
  //     'daughter',
  //     'son',
  //     'others',
  //   ],
  //   description:
  //     'Get cover till age 85 & Protection against Income Loss | Option to Skip Premium for a year. Now secure your family & also cover yourself against 64 critical illnesses till age 85. 30 Day Return Option. Hassle Free Process. Accident Cover. Affordable Premium. 99.51% Settlement Ratio. Cover 64 Critical Illness.',
  // },
  // {
  //   id: '2',
  //   title: 'Reliance Insurance Policy',
  //   companyName: 'Reliance',
  //   beneficiariesList: [
  //     'self',
  //     'spouse',
  //     'mother',
  //     'father',
  //     'daughter',
  //     'son',
  //     'others',
  //   ],
  //   insuredAmount: '18lk',
  //   description:
  //     ' This health insurance plan gives healthcare protection for an individual as well as a family under a single sum insured. It offers a wide range of sum insured from Rs. 3 lakh to Rs. 18 lakh. The plan offers coverage to people from the age of 3 months to 65 years with a lifelong renewability option. The features of this plan include in-patient treatment, pre-hospitalisation and post-hospitalisation costs, donor expenses, day care procedures, etc. It gives a cumulative bonus with a 33.3% increase in the sum insured for every claim-free year maximum up to 100%.',
  // },
];

export const policyReducer = createReducer(
  intialPolicyList,
  on(PolicyAction.addPolicy, (state, { policy }) => {
    return [...state, policy];
  }),
  on(PolicyAction.deletePolicy, (state, { id }) => {
    console.log(
      id,
      'My deleted policy',
      state.filter((p) => p.id != id)
    );
    return state.filter((p) => p.id != id);
  }),
  on(PolicyAction.savePolicy, (state, { policies }) => {
    return policies;
  })
);
