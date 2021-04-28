import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

declare var $: any;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(private auth: AuthService, private router: Router) {
    }

    userEmail: String;
    userName: String;
    userPassword: String;

    ngOnInit(): void {
    }

    userRegister() {
        const user = {
            username: this.userEmail,
            password: this.userPassword,
            name: this.userName,
            userRole: 'USER'
        };

        this.auth.registerUser(user).subscribe((data) => {
            $.notify({
                icon: "pe-7s-check",
                message: "User is registered"
            }, {
                type: 'success',
                timer: 500,
                placement: {
                    from: 'top',
                    align: 'center'
                }
            });
        }, (error) => {
            console.log();
            $.notify({
                icon: "pe-7s-info",
                message: error.error.message
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

}
