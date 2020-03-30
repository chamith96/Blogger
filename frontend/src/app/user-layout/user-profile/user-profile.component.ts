import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { BlogService } from 'app/services/blog/blog.service';
import { AuthService } from 'app/services/auth/auth.service';
import { UserService } from 'app/services/user/user.service';

declare var $:any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  blog:any;
  p: number = 1;
  userDescription: String;
  user:any;

  constructor(private userService: UserService,private blogService: BlogService, private router: Router,private auth: AuthService,private activeRoute:ActivatedRoute) {
    this.blogService.getUserBlog(this.auth.getUserIdFromToken())
    .subscribe((data) => {
      if(this.auth.getUserIdFromToken() != this.activeRoute.snapshot.params['id']) {
        this.router.navigate(['/user/'+this.auth.getUserIdFromToken()]);
      }
      this.blog = data;
    });

    this.userService.showUserById(this.auth.getUserIdFromToken())
    .subscribe((data) => {
      this.user = data;
    });
  }

  ngOnInit(): void {
  }

  updateDescription() {
    const userDec = {'description':this.userDescription};

    this.userService.addDescrptionUser(userDec,this.auth.getUserIdFromToken())
    .subscribe((data) => {
      this.router.navigate(['/user/'+this.auth.getUserIdFromToken()]);
      $.notify({
        icon: "pe-7s-check",
        message: "User descrption updated"
    },{
        type: 'success',
        timer: 500,
        placement: {
            from: 'top',
            align: 'center'
        }
    });
    });
  }

  deleteBlog() {
    this.blogService.deleteBlog(this.blog[0].bid).subscribe(() => {
      $.notify({
        icon: "pe-7s-info",
        message: "User descrption updated"
    },{
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
