import {Component, OnInit} from '@angular/core';
import {UserService} from 'app/services/user/user.service';
import {BlogService} from 'app/services/blog/blog.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    user: any;
    blog: any;
    p: number = 1;
    userBlog: any;
    userId: any;

    selectIdHandler(event: any) {
        this.userId = event.target.value;
        this.blogService.getUserBlog(this.userId).subscribe((data) => {
            this.userBlog = data;
            console.log(this.userBlog)
        });
    }

    constructor(private userService: UserService, private blogService: BlogService) {
        this.userService.showAllUser()
            .subscribe((data) => {
                this.user = data;
            });
    }

    ngOnInit() {
    }

}
