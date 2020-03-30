import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  authToken = localStorage.getItem('token');
  host:String = "http://localhost:8082/api";

  countBlog() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer "+this.authToken);
      return this.http.get(this.host+'/blog/count');
  }

  countUser() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer "+this.authToken);
      return this.http.get(this.host+'/user/count');
  }

  countReviewer() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer "+this.authToken);
      return this.http.get(this.host+'/reviewer/count');
  }

  countAssign() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer "+this.authToken);
      return this.http.get(this.host+'/blog/count/assign');
  }

  countAssignStatus() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer "+this.authToken);
      return this.http.get(this.host+'/blog/count/assign/status');
  }

}
