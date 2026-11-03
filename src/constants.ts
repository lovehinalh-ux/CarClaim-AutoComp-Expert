import { CategoryType, ClaimItem, FormState, MedicalEntry } from './types';
import { createId } from './utils/id';

export const MEDICAL_ITEM_ID = '1';

export const FAULT_CALC_URL = 'https://personal-one-page-blue-pro-type.lovehinalh.workers.dev/accident/fault';
export const JUDGMENTS_URL = 'https://car-accident-judgments.lovehinalh.workers.dev/';

/**
 * Item ids are persisted in localStorage (amounts are keyed by id).
 * Never reuse or repurpose an id; add a new one instead. If the meaning of
 * stored data changes, bump STORAGE_KEY in utils/storage.ts.
 */
export const INITIAL_ITEMS: ClaimItem[] = [
  // 醫療及相關
  {
    id: MEDICAL_ITEM_ID,
    category: CategoryType.MEDICAL_AND_SALARY,
    name: '醫療費用',
    amount: 0,
    hint: '包含醫院掛號費、手術費、住院費、藥品費等。',
    description: '收據有很多張時，點「填寫明細 →」逐筆輸入日期與金額，系統會自動加總。'
  },
  {
    id: '7',
    category: CategoryType.MEDICAL_AND_SALARY,
    name: '交通費',
    amount: 0,
    hint: '就醫往返的計程車、大眾運輸、停車費等。',
    description: '請保留計程車收據或乘車紀錄，日期要對得上就醫紀錄；自行開車可附停車費單據。'
  },
  {
    id: '8',
    category: CategoryType.MEDICAL_AND_SALARY,
    name: '看護費',
    amount: 0,
    hint: '受傷期間需要他人照顧的費用，家人看護也可以請求。',
    description: '診斷證明需載明「需專人看護」及期間；請看護要留收據，家人看護可依看護行情計算。'
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
    description: '無固定標準，視受傷程度與雙方資力判斷。',
    link: { label: '查看類似傷勢的判決參考 →', href: JUDGMENTS_URL }
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

export const DEFAULT_MEDICAL_ROWS = 3;

export const createMedicalEntry = (): MedicalEntry => ({
  id: createId('med'),
  date: '',
  amount: 0,
});

export const createInitialState = (): FormState => ({
  claimantName: '',
  accidentDate: '',
  items: INITIAL_ITEMS.map((item) => ({ ...item, amount: 0 })),
  medicalEntries: Array.from({ length: DEFAULT_MEDICAL_ROWS }, createMedicalEntry),
  customItems: [
    { id: createId('custom'), name: '', amount: 0 },
    { id: createId('custom'), name: '', amount: 0 },
  ],
  faultPercent: 0,
});
