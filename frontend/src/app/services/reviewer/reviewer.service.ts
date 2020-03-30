import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewerService {

  constructor(private http: HttpClient) { }

  authToken = localStorage.getItem('token');
  host:String = "http://localhost:8082/api";

  addReviewer(body){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer "+this.authToken);
      return this.http.post(this.host+'/reviewer', body,{headers: headers});
  }

  showAllReviewers() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer "+this.authToken);
      return this.http.get(this.host+'/reviewer', {headers: headers});
  }

  showReviewerById(id) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer "+this.authToken);
    return this.http.get(this.host+'/reviewer/'+id,{headers: headers});
  }

  deleteReviewer(id) {
    let headers = new HttpHeaders();
    headers.append('Authorization', "Bearer "+this.authToken);
    return this.http.delete(this.host+'/reviewer/'+id);
  }

  editReviewer(body, id) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer "+this.authToken);
    return this.http.put(this.host+'/reviewer/'+id, body, {headers: headers});
  }
}
