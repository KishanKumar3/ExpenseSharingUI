import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-view-expense',
  templateUrl: './view-expense.component.html',
  styleUrls: ['./view-expense.component.css']
})
export class ViewExpenseComponent implements OnInit {
  // expenses: any[] = [];

  expenses = new MatTableDataSource<any>();

  private subscription!: Subscription ;


  constructor(
    public dialogRef: MatDialogRef<ViewExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private expenseService: ExpenseService,
    private snackBar: MatSnackBar
  ) {}




  ngOnInit(): void {
    this.loadExpenses(this.data.groupId);
    // console.log(this.expenses.data)

    this.subscription = this.expenseService.expenses$.subscribe(expenses => {
      this.expenses.data = expenses;
    });
  }

  loadExpenses(groupId: string): void {
    this.expenseService.getExpensesByGroupId(groupId).subscribe((response: any) => {
      if (response && response.$values) {
        this.expenses.data = response.$values; // Assigning $values array to MatTableDataSource
        // console.log(this.expenses.data); 
      } else {
        console.error('Invalid response format from getExpensesByGroupId API');
      }
    });
  }

  settleExpense(expenseId: string): void {
    this.expenseService.settleExpense(expenseId).subscribe(() => {
      this.loadExpenses(this.data.groupId);
    });
    this.dialogRef.close();
    this.snackBar.open('Expense settled', 'Close', {
      duration: 3000,
    });
  }



  close(): void {
    this.dialogRef.close();
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
