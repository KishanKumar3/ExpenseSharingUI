import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { AddNewGroupComponent } from './dashboard/add-new-group/add-new-group.component';
import { AddedGroupsComponent } from './dashboard/added-groups/added-groups.component';
import { HomeComponent } from './home/home.component';
import { ManageGroupsComponent } from './dashboard/manage-groups/manage-groups.component';
import { AllExpensesComponent } from './dashboard/all-expenses/all-expenses.component';
import { AllUsersComponent } from './dashboard/all-users/all-users.component';
import { BalanceComponent } from './dashboard/balance/balance.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'add-new-group', component: AddNewGroupComponent },
  { path: 'added-groups', component: AddedGroupsComponent },
  { path: 'manage-groups', component: ManageGroupsComponent },
  { path: 'all-expenses', component: AllExpensesComponent },
  { path: 'all-users', component: AllUsersComponent },
  {path: 'balances', component: BalanceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
