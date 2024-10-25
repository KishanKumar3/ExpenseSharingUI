import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserLoginComponent } from './user/user-login/user-login.component';
import { AddNewGroupComponent } from './dashboard/add-new-group/add-new-group.component';
import { AddedGroupsComponent } from './dashboard/added-groups/added-groups.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { AlertifyService } from './services/alertify.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { GroupService } from './services/group.service';
import { MatTableModule } from '@angular/material/table';
import { ManageGroupsComponent } from './dashboard/manage-groups/manage-groups.component';
import { GroupModalComponent } from './dashboard/group-modal/group-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthInterceptor } from './services/auth.interceptor';
import { AddExpenseComponent } from './dashboard/add-expense/add-expense.component';
import { ExpenseService } from './services/expense.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewExpenseComponent } from './dashboard/view-expense/view-expense.component';
import { AllExpensesComponent } from './dashboard/all-expenses/all-expenses.component';
import { AllUsersComponent } from './dashboard/all-users/all-users.component';
import { BalanceComponent } from './dashboard/balance/balance.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [		
    AppComponent,
    NavBarComponent,
    UserLoginComponent,
    AddNewGroupComponent,
    AddedGroupsComponent,
      HomeComponent,
      ManageGroupsComponent,
      GroupModalComponent,
      AddExpenseComponent,
      ViewExpenseComponent,
      AllExpensesComponent,
      AllUsersComponent,
      BalanceComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  providers: [AuthService,
  AlertifyService,
  GroupService,
  ExpenseService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
