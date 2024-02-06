export interface Policy {
  id: string;
  title: string;
  insuredAmount: String;
  companyName: String;
  beneficiariesList: any[] | null;
  description: String;
}
