export interface Spending {
  ID: string;
  amount: number;
  category: string;
  categoryColor: string;
  categoryID: string;
  currency: string;
  date: string;
  invoicefile: null | string;
  itemType: string;
  label: string;
  userID: string;
}

export interface MonthRange {
  start: Date;
  end: Date;
}
