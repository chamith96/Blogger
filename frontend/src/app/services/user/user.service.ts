import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  host:String = "http://localhost:8082/api";
  authToken = localStorage.getItem('token');

  showUserById(id) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer "+this.authToken);
    return this.http.get(this.host+'/user/'+id, {headers: headers});
  }

  showAllUser() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer "+this.authToken);
    return this.http.get(this.host+'/user/', {headers: headers});
  }

  addDescrptionUser(body,id) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer "+this.authToken);
    return this.http.put(this.host+'/user/'+id, body,{headers: headers});
  }

  sendEmailUser(body,id) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer "+this.authToken);
    return this.http.post(this.host+'/user/email/'+id, body,{headers: headers});
  }

  showAllEmails() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer "+this.authToken);
    return this.http.get(this.host+'/email/', {headers: headers});
  }

}
