import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = environment.baseApiUrl + '/api/Group';  

  constructor(private http: HttpClient) {}

  getGroups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getGroupById(groupId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${groupId}`);
  }


  getGroupsByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`);
  }

  createGroup(group: { name: string; description: string; createdDate: Date; memberEmails: string[] }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, group);
  }

  deleteGroup(groupId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
    });

    return this.http.delete<any>(`${this.apiUrl}/${groupId}`, { headers, responseType: 'text' as 'json' });
  }





}
