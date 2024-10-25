import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GroupService } from 'src/app/services/group.service';
import { GroupModalComponent } from '../group-modal/group-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { GroupResponse } from 'src/app/model/GroupResponse';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { ExpenseService } from 'src/app/services/expense.service';
import { ViewExpenseComponent } from '../view-expense/view-expense.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { forkJoin } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.css']
})
export class ManageGroupsComponent implements OnInit {
  groups= new MatTableDataSource<any>();
  displayedColumns: string[] = ['name', 'description', 'createdDate', 'members', 'viewExpenses', 'totalExpense', 'actions'];
  

  constructor(private groupService: GroupService,
    
    private expenseService: ExpenseService, private dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadGroups();
  }
  loadGroups(): void {


    this.authService.getCurrentUser().subscribe(user => {
      // console.log(user)
      if (user) {

        const userId = user.UserId;
        this.userService.getUserDetails(userId).subscribe(
          (userDetails: any) => {
              if(userDetails.role === 'Normal') {
                this.groupService.getGroupsByUserId(userId).subscribe((response: any) => {
                  if (response && response.$values) {
                    this.groups.data = response.$values; // Assigning $values array to MatTableDataSource
                    // console.log(this.groups.data); // Check data in console
                  } else {
                    console.error('Invalid response format from getGroups API');
                  }
                }, error => {
                  console.error('Error fetching groups:', error);
                });
              } 
              else {
                this.groupService.getGroups().subscribe((response: any) => {
                  if (response && response.$values) {
                    this.groups.data = response.$values; // Assigning $values array to MatTableDataSource
                    // console.log(this.groups.data); // Check data in console
                  } else {
                    console.error('Invalid response format from getGroups API');
                  }
                }, error => {
                  console.error('Error fetching groups:', error);
                });
              }
          },
          error => {
            console.error('Failed to fetch user details', error);
          }
        );
      } 
    });


  }



  // loadGroups(): void {

  //   this.groupService.getGroups().subscribe((response: any) => {
  //     if (response && response.$values) {
  //       this.groups.data = response.$values; // Assigning $values array to MatTableDataSource
  //       // console.log(this.groups.data); // Check data in console
  //     } else {
  //       console.error('Invalid response format from getGroups API');
  //     }
  //   }, error => {
  //     console.error('Error fetching groups:', error);
  //   });
  // }
  

  openCreateGroupModal(): void {
    const dialogRef = this.dialog.open(GroupModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadGroups();
      }
    });
  }

  addExpense(groupId: string): void {
    const dialogRef = this.dialog.open(AddExpenseComponent, {
      width: '400px',
      data: { groupId: groupId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.expenseService.addExpense(result).subscribe(() => {
          this.loadGroups();
        });
      }
    });
  }

  
  

  deleteGroup(groupId: string): void {
    this.groupService.deleteGroup(groupId).subscribe(() => {
      this.loadGroups();
    });
    this.snackBar.open('Group deleted', 'Close', {
      duration: 3000,
    });
  }


  viewExpenses(groupId: string): void {
    this.dialog.open(ViewExpenseComponent, {
      width: '600px',
      data: { groupId: groupId }
    });
  }

}
