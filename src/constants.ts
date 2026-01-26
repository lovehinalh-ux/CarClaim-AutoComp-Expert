
import { CategoryType, ClaimItem, MedicalEntry } from './types';

export const INITIAL_ITEMS: ClaimItem[] = [
  // 醫療及相關
  {
    id: '1', // Medical Expenses ID
    category: CategoryType.MEDICAL_AND_SALARY,
    name: '醫療費用',
    amount: 0,
    hint: '包含醫院掛號費、手術費、住院費、藥品費等。',
    description: '可點擊「詳細計算」按鈕進入明細表填寫。'
  },
  {
    id: '2',
    category: CategoryType.MEDICAL_AND_SALARY,
    name: '薪資損失',
    amount: 0,
    hint: '因受傷無法上班期間的工資。',
    description: '須提供診斷證明書（載明需休養天數）及薪資證明。'
  },

  {
    id: '6',
    category: CategoryType.MEDICAL_AND_SALARY,
    name: '精神慰撫金',
    amount: 0,
    hint: '因身體受傷導致生理與心理痛苦之補償。',
    description: '無固定標準，視受傷程度與雙方資力判斷。'
  },
  // 財產損害
  {
    id: '4',
    category: CategoryType.PROPERTY_DAMAGE,
    name: '車輛維修費',
    amount: 0,
    hint: '汽機車因車禍毀損之修理費用。',
    description: '請提供車廠維修估價單或發票。'
  },
  {
    id: '5',
    category: CategoryType.PROPERTY_DAMAGE,
    name: '其他財產損失',
    amount: 0,
    hint: '安全帽、手機、衣物、手錶等毀損項目。',
    description: '請填寫購買時價格或目前修復價格。'
  }
];

export const INITIAL_MEDICAL_ENTRIES: MedicalEntry[] = Array.from({ length: 10 }, (_, i) => ({
  id: `med-${i}`,
  date: '',
  amount: 0,
}));
