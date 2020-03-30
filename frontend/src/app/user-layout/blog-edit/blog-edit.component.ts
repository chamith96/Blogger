import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router,ActivatedRoute } from '@angular/router';
import { BlogService } from 'app/services/blog/blog.service';
import { AuthService } from 'app/services/auth/auth.service';

declare var $:any;

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {

  public Editor = ClassicEditor;
  blogContent:String;
  blogTitle:String;
  blogData:any;
  blog:any;

  constructor(private authService: AuthService,private blogService: BlogService, private router: Router,private activeRoute:ActivatedRoute) {
    this.blogService.showBlogById(this.activeRoute.snapshot.params['id'])
    .subscribe((data) => {
      this.blog = data;
      if(this.blog.user.uid==this.authService.getUserIdFromToken()) {
        this.blogContent = this.blog.content;
        this.blogTitle = this.blog.title;
      } else {
        this.router.navigate(["blog/"+this.activeRoute.snapshot.params['id']]);
      }

    });
   }

  ngOnInit(): void {
  }

  blogSubmit() {
    const blog = {
      content: this.blogContent,
      title: this.blogTitle,
    };
    this.blogService.editBlog(blog,this.activeRoute.snapshot.params['id'])
    .subscribe((data) => {
      this.blogData = data;
      this.router.navigate(['blog/'+this.activeRoute.snapshot.params['id']]);
      this.successMessage("BLog is updated");

    },(error) => {
      this.failMessage("Blog edit fail");
    }); 
  }

  successMessage(msg) {
    $.notify({
      icon: "pe-7s-check",
      message: msg
  },{
      type: 'success',
      timer: 500,
      placement: {
          from: 'top',
          align: 'center'
      }
  });
  }

  failMessage(msg) {
    $.notify({
      icon: "pe-7s-info",
      message: msg
  },{
      type: 'danger',
      timer: 500,
      placement: {
          from: 'top',
          align: 'center'
      }
  });
  }

}
