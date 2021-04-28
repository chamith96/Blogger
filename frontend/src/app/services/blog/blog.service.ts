import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BlogService {

    constructor(private http: HttpClient) {
    }

    authToken = localStorage.getItem('token');
    host: String = "http://localhost:8082/api";

    submitBlog(body) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + this.authToken);
        return this.http.post(this.host + '/blog', body, {headers: headers});
    }

    showAllBlogs() {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.host + '/blog/all', {headers: headers});
    }

    showBlogById(id) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.host + '/blog/all/' + id, {headers: headers});
    }

    deleteBlog(id) {
        let headers = new HttpHeaders();
        headers.append('Authorization', "Bearer " + this.authToken);
        return this.http.delete(this.host + '/blog/' + id);
    }

    editBlog(body, id) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + this.authToken);
        return this.http.put(this.host + '/blog/' + id, body, {headers: headers});
    }

    getUserBlog(userId) {
        let headers = new HttpHeaders();
        headers.append('Authorization', "Bearer " + this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.host + '/blog/user/' + userId, {headers: headers});
    }

    assignReviewer(blogId, reviewerId) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + this.authToken);
        return this.http.post(this.host + '/blog/' + blogId + '/reviewer/' + reviewerId, {headers: headers});
    }

    showAllAssigns() {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + this.authToken);
        return this.http.get(this.host + '/blog/assign', {headers: headers});
    }

    searchAll(value: String) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.host + '/blog/all/search/' + value);
    }

    uploadImage(blogId, file) {
        let headers = new HttpHeaders();
        let formData = new FormData();
        formData.append('file', file);
        headers.append('Authorization', "Bearer " + this.authToken);
        return this.http.put(this.host + '/blog/upload/' + blogId, formData);
    }

    sendNotification(blogId) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + this.authToken);
        return this.http.get(this.host + '/notification/blog/' + blogId, {headers: headers});
    }

    getNotification(blogId, reviewerId) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + this.authToken);
        return this.http.put(this.host + '/notification/blog/' + blogId + '/reviewer/' + reviewerId, {headers: headers});
    }
}


