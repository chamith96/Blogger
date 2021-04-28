import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private jwtauth: JwtHelperService) {
    }

    payload: any;
    authToken: any;
    role: String;
//userId: Number;
    host: String = "http://localhost:8082/api";

    registerUser(body) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.host + '/user/register', body, {headers: headers});
    }

    loginUser(body) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.host + '/user/login', body, {headers: headers});
    }

    //store token and payload data in angular local db
    storeUserData(token) {
        localStorage.setItem('token', token);
        const tokenPayload = this.jwtauth.decodeToken(token);
        localStorage.setItem('payload', JSON.stringify(tokenPayload));

        this.authToken = token;
        this.payload = tokenPayload;
    }

    //user logout
    logOut() {
        this.authToken = null;
        this.payload = null;
        localStorage.clear();
    }

    //get token expire or not
    isTokenExpired() {
        return this.jwtauth.isTokenExpired();
    }

    getRoleFromToken() {
        const token = localStorage.getItem('token');
        // decode the token to get its payload
        const tokenPayload = this.jwtauth.decodeToken(token);
        this.role = tokenPayload.role;
        return this.role;
    }

    getUserIdFromToken() {
        const token = localStorage.getItem('token');
        // decode the token to get its payload
        const tokenPayload = this.jwtauth.decodeToken(token);
        return tokenPayload.UserId;
        // return this.userId;
    }
}
