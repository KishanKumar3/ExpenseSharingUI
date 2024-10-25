import { Expense } from "./IExpense";
import { User } from "./IUser";

export interface Group {
    $id: string;
    groupId: string;
    name: string;
    description: string;
    createdDate: Date;
    expenses: Expense[];
    members: User[];
    totalExpense: number;
  }
  
  