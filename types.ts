
export enum CategoryType {
  MEDICAL_AND_SALARY = '醫療、交通、薪資損害與撫慰金',
  PROPERTY_DAMAGE = '財產損失'
}

export interface ClaimItem {
  id: string;
  category: CategoryType;
  name: string;
  amount: number;
  hint: string;
  description: string;
}

export interface MedicalEntry {
  id: string;
  date: string;
  amount: number;
}

export interface CustomItem {
  id: string;
  name: string;
  amount: number;
}

export interface FormState {
  claimantName: string;
  accidentDate: string;
  items: ClaimItem[];
  medicalEntries: MedicalEntry[];
  customItems: CustomItem[];
}
