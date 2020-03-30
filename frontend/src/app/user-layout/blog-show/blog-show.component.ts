import { Component, OnInit } from '@angular/core';
import { BlogService } from 'app/services/blog/blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-show',
  templateUrl: './blog-show.component.html',
  styleUrls: ['./blog-show.component.css']
})
export class BlogShowComponent implements OnInit {

  blog:any;

  constructor(private blogService: BlogService,private activeRoute:ActivatedRoute) { 
    this.blogService.showBlogById(this.activeRoute.snapshot.params['id'])
    .subscribe((data) => {
      this.blog = data;
    });
  }

  ngOnInit(): void {
  }

}
