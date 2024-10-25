import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import { User } from '../model/IUser';
import { UserLoginResponse } from '../model/UserLoginResponse';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseApiUrl;
  private userPayload: any;
  private currentUserSubject = new BehaviorSubject<any>(null);

constructor(private http: HttpClient) { 
  this.userPayload = this.decodedToken();
  if(this.userPayload) {
    this.setCurrentUser(this.userPayload);
  }
}

loginUser(user: User) {
  return this.http.post<UserLoginResponse>(this.baseUrl + '/api/User/login' , user )
}

decodedToken() {
  const jwtHelper = new JwtHelperService();
  const token = localStorage.getItem('token')!;
  // console.log(jwtHelper.decodeToken(token))
  return jwtHelper.decodeToken(token);
}

getUserId() : string {
  return this.userPayload.UserId;
}


setCurrentUser(user: any) {
  this.currentUserSubject.next(user);
}

getCurrentUser(): Observable<any> {
  return this.currentUserSubject.asObservable();
}

logout() {
  localStorage.removeItem('token');
  this.currentUserSubject.next(null);
}
}
