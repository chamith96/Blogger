import { Component, OnInit } from '@angular/core';
import { BlogService } from 'app/services/blog/blog.service';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs:any;
  blog_1:any;
  blog_2:any;
  blog_3:any;
  blog_4:any;
  p: number = 1;
  userSearch:String;
  blogSearch:any

  constructor(private blogService:BlogService) { 
    this.blogService.showAllBlogs().subscribe((data) => {
      this.blogs = data;  
      this.blog_1 = this.blogs[0];
      this.blog_2 = this.blogs[1];
      this.blog_3 = this.blogs[2];
      this.blog_4 = this.blogs[3];
    });


  
  }

  ngOnInit(): void {
  }

}
