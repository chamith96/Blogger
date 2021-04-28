import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {BlogService} from 'app/services/blog/blog.service';

declare var $: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private auth: AuthService, private router: Router, private blogService: BlogService) {
    }

    notification: any;
    userEmail: String;
    userPassword: String;
    userData: any;

    ngOnInit(): void {
    }

    userLogin() {
        const user = {
            username: this.userEmail,
            password: this.userPassword
        };

        this.auth.loginUser(user).subscribe((data) => {
            this.userData = data;
            if (this.userData.token != null) {
                this.auth.storeUserData(this.userData.token);

                if (this.auth.getRoleFromToken() == "ROLE_ADMIN") {
                    this.router.navigate(['admin/dashboard']);
                    this.successMessage();
                } else if (this.auth.getRoleFromToken() == "ROLE_USER") {
                    this.router.navigate(['/']);
                    this.successMessage();
                }
            }
        }, (error) => {
            $.notify({
                icon: "pe-7s-info",
                message: "Email or Password is incorect"
            }, {
                type: 'danger',
                timer: 500,
                placement: {
                    from: 'top',
                    align: 'center'
                }
            });
        });
    }

    successMessage() {
        $.notify({
            icon: "pe-7s-check",
            message: "Login Success"
        }, {
            type: 'success',
            timer: 500,
            placement: {
                from: 'top',
                align: 'center'
            }
        });
    }

}
