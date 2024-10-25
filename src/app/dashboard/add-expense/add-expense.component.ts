import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { GroupResponse } from 'src/app/model/GroupResponse';
import { Group } from 'src/app/model/IGroup';
import { User } from 'src/app/model/IUser';
import { UserName } from 'src/app/model/userName';
import { ExpenseService } from 'src/app/services/expense.service';

import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  description!: string;
  amount!: number;
  date!: Date;
  paidById!: string;
  groupId!: string;

  members: any[] = [];


  selectedUser: User | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private groupService: GroupService,
    private userService: UserService,
    private expenseService: ExpenseService,
    private snackBar: MatSnackBar
  ) {
    this.groupId = data.groupId;
  }

  ngOnInit(): void {
    this.loadGroupMembers(this.groupId);
    console.log(this.members)

    
  }


  loadGroupMembers(groupId: string): void {
    this.groupService.getGroupById(groupId).subscribe((group: any) => {
      const userIds = group.members.$values.map((member: any) => member.userId);
      
      forkJoin(
        userIds.map((userId: string) => this.userService.getUserDetails(userId))
      ).subscribe((users: any) => {
        this.members = users.map((user: any, index: number) => ({
          userId: userIds[index],  // Use userId from the original list
          name: user.name          // Use fetched name
        }));
        console.log('Members:', this.members); // Log members after they are loaded
      });
    });
  }
  

  onAddExpense(): void {
    const expense = {
      description: this.description,
      amount: this.amount,
      date: this.date,
      paidById: this.paidById,
      groupId: this.groupId
    };

    this.dialogRef.close(expense);
    this.snackBar.open('Expense added successfully', 'Close', {
      duration: 3000,
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onUserSelected(event: any): void {
    const userId = event.value;
    console.log('Selected UserId:', userId);
    this.selectedUser = this.members.find(member => member.userId === userId) || null;
    console.log('Selected User:', this.selectedUser);
  }

}
