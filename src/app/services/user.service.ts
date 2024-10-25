import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/IUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApiUrl = environment.baseApiUrl +'/api/User';

constructor(private http: HttpClient) { }

getAllUsers(): Observable<any[]> {
  return this.http.get<any[]>(`${this.userApiUrl}`);
}

getUserDetails(userId: string): Observable<User> {
  return this.http.get<User>(`${this.userApiUrl}/${userId}`);
}

}
