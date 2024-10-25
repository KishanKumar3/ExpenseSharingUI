import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private expensesSubject = new BehaviorSubject<any[]>([]);
  public expenses$ = this.expensesSubject.asObservable();

  private apiUrl = environment.baseApiUrl + '/api';

  constructor(private http: HttpClient) {}

  addExpense(expense: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
    });
    
    return this.http.post<any>(`${this.apiUrl}/Expense`, expense, { headers, responseType: 'text' as 'json' });
  }


  getExpensesByGroupId(groupId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Expense/group/${groupId}/expenses`).pipe(
      tap(expenses => this.expensesSubject.next(expenses.$values))
    );
  }

  settleExpense(expenseId: string): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
    });

    return this.http.post<void>(`${this.apiUrl}/Expense/settle/${expenseId}`, { headers, responseType: 'text' as 'json' }).pipe(
      tap(() => {
        // Re-fetch expenses after settling one
        this.getAllExpenses().subscribe();
      })
    );
  }

  getAllExpenses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Expense`).pipe(
      tap(expenses => this.expensesSubject.next(expenses))
    );
  }


  // getExpensesByGroupId(groupId: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/Expense/group/${groupId}/expenses`);
  // }

  // settleExpense(expenseId: string): Observable<void> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json, text/plain, */*'
  //   });

  //   return this.http.post<void>(`${this.apiUrl}/Expense/settle/${expenseId}`, { headers, responseType: 'text' as 'json' });
  // }




  // getAllExpenses(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/Expense`);
  // }

}
