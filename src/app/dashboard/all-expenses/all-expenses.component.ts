import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.css']
})
export class AllExpensesComponent implements OnInit {
  expenses: any[] = [];

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.loadAllExpenses();
  }

  loadAllExpenses(): void {
    this.expenseService.getAllExpenses().subscribe(
      (expenses : any) => {
       this.expenses = expenses.$values;
        console.log(expenses);
      },
      error => {
        console.error('Failed to fetch expenses', error);
      }
    );
  }
}
