import { User } from "@src/interfaces/user";

export type Month =
  | { start: Date; end: Date; }
  | null;


export type ReccuringType = {
  amount: number;
  createdAt: string;
  createdBy: string;
  currency: string;
  dateFrom: string;
  dateTo: string;
  itemType: string;
  label: string;
  updatedAt: string;
  id?: number;
};

export type SpendingType = {
  amount: string;
  catID: number;
  category: string;
  createdAt: string;
  createdBy: string;
  currency: string;
  date: string;
  itemType: string;
  label: string;
  updatedAt: string;
  id?: number;
};

export type SpendingCompoundType = SpendingType[] & {
  id: string;
  date: number;
  total : number
};

export type SpendingsType = Array<SpendingCompoundType>;

interface SpendingsPartial {
  spendingsByDaySorted: SpendingCompoundType;
  deleteSpending: (itemID: string, itemType: string) => void;
  isLoading: boolean;
  recurringType?: boolean;
}

export interface SpendingDayItemType extends SpendingsPartial {
  user: User;
  month?: string | null;
  date?: number | Date;
  total?: number;
}

export interface SpendingsListContainerType extends SpendingsPartial {
  toggleAddSpending: () => void;
  editSpending: (spending: SpendingCompoundType) => void;
}

