import {Component, OnInit} from '@angular/core';
import {AuthService} from 'app/services/auth/auth.service';
import {BlogService} from 'app/services/blog/blog.service';
import {Router, NavigationEnd} from '@angular/router';
import {UserService} from 'app/services/user/user.service';

declare var $: any;

@Component({
    selector: 'app-navbar-user',
    templateUrl: './navbar-user.component.html',
    styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {

    user: any;
    notification: any;
    notificationCount: Number;
    mySubscription: any;

    constructor(private userService: UserService, private auth: AuthService, private router: Router, private blogService: BlogService) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };

        this.mySubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // Trick the Router into believing it's last link wasn't previously loaded
                this.router.navigated = false;
            }
        });

        if (!this.auth.isTokenExpired()) {
            this.blogService.sendNotification(this.auth.getUserIdFromToken())
                .subscribe((data) => {
                    this.notification = data;
                    this.notificationCount = this.notification.length;
                });

            this.userService.showUserById(this.auth.getUserIdFromToken())
                .subscribe((val) => {
                    this.user = val;
                });
        }
    }

    ngOnInit(): void {

    }

    makeAsRead(bid, rid) {
        this.blogService.getNotification(bid, rid)
            .subscribe(() => {
                this.router.navigate(['/']);
            });
    }

    logOut() {
        this.auth.logOut();
        this.router.navigate(['']);
        $.notify({
            icon: "pe-7s-check",
            message: "Logout Success"
        }, {
            type: 'success',
            timer: 500,
            placement: {
                from: 'top',
                align: 'center'
            }
        });
    }

    ngOnDestroy() {
        if (this.mySubscription) {
            this.mySubscription.unsubscribe();
        }
    }
}
