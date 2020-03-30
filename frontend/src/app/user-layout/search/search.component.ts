import { Component, OnInit } from '@angular/core';
import { BlogService } from 'app/services/blog/blog.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  blogs:any;
  userSearch:String;
  blogSearch:any;

  constructor(private blogService:BlogService) {}

  searchItem() {
    this.blogService.searchAll(this.userSearch).subscribe((data) => {
      this.blogSearch = data;
      this.blogs = this.blogSearch;
    });
  }

  ngOnInit(): void {
  }

}
