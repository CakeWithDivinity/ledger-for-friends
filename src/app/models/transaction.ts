export interface Transaction {
  amount: number;
  participants: TransactionParticipant[];
}

export interface TransactionParticipant {
  shouldBeEvaluated: boolean;
  name: string;
  amount: number;
  unit: TransactionUnit;
}

export interface TransactionResult {
  name: string;
  price: number;
}

export type TransactionUnit = 'fraction';
