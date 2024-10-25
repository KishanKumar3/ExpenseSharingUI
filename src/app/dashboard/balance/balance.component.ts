import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  expenses: any[] = [];
  groups: any[] = [];
  users: any[] = [];
  balances: any[] = [];

  currentUserId: string = '';
  userRole: string = '';


  constructor(
    private expenseService: ExpenseService,
    private groupService: GroupService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.currentUserId = user.UserId;
        this.userRole = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        // console.log('role', this.userRole)
      } 
    });

    this.loadData();
  }


  loadData(): void {
    let expensesLoaded = false;
    let groupsLoaded = false;
    let usersLoaded = false;

    this.expenseService.getAllExpenses().subscribe((expenses: any) => {
      this.expenses = expenses.$values;
      expensesLoaded = true;
      this.checkDataLoadComplete(expensesLoaded, groupsLoaded, usersLoaded);
    });

    this.groupService.getGroups().subscribe((groups: any) => {
      this.groups = groups.$values;
      groupsLoaded = true;
      this.checkDataLoadComplete(expensesLoaded, groupsLoaded, usersLoaded);
    });

    this.userService.getAllUsers().subscribe((users: any) => {
      this.users = users.$values;
      usersLoaded = true;
      this.checkDataLoadComplete(expensesLoaded, groupsLoaded, usersLoaded);
    });
  }

  checkDataLoadComplete(expensesLoaded: boolean, groupsLoaded: boolean, usersLoaded: boolean): void {
    if (expensesLoaded && groupsLoaded && usersLoaded) {
      this.calculateBalances();
      console.log('balances', this.balances);
    }
  }

  calculateBalances(): void {
    if (this.expenses.length > 0 && this.groups.length > 0 && this.users.length > 0 && this.currentUserId) {
      const balancesMap = new Map<string, { owes: any[], owed: any[] }>();

      this.users.forEach(user => {
        balancesMap.set(user.id, { owes: [], owed: [] });
      });

      this.expenses.forEach(expense => {
        console.log('Processing expense:', expense);
        if (expense.isSettled) {
          return; // Skip settled expenses
        }
        const group = this.groups.find(g => g.groupId === expense.groupId);
        const payer = this.users.find(u => u.id === expense.paidById);

        if (group && payer) {
          console.log('Found group:', group);
          console.log('Found payer:', payer);
          const splitAmount = expense.amount / group.members.$values.length;

          group.members.$values.forEach((member: any) => {
            console.log('Processing member:', member);
            if (member.userId !== expense.paidById) {
              const memberUser = this.users.find(u => u.id === member.userId);
              if (memberUser) {
                console.log('Found member user:', memberUser);
                balancesMap.get(member.userId)?.owes.push({
                  to: payer.name,
                  amount: splitAmount
                });

                balancesMap.get(payer.id)?.owed.push({
                  from: memberUser.name,
                  amount: splitAmount
                });
              }
            }
          });
        }
      });

      // Filter balances to display only for the current user
      if(this.userRole === 'Normal') {
        this.balances = [{
          user: this.users.find(u => u.id === this.currentUserId),
          owes: balancesMap.get(this.currentUserId)?.owes || [],
          owed: balancesMap.get(this.currentUserId)?.owed || []
        }];
      }
      else {
        this.balances = Array.from(balancesMap.entries()).map(([userId, { owes, owed }]) => ({
          user: this.users.find(u => u.id === userId),
          owes,
          owed
        }));
      }


      
    }
  }
}