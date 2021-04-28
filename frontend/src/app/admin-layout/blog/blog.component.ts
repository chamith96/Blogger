import {Component, OnInit, ViewChild, ElementRef,} from '@angular/core';
import {BlogService} from 'app/services/blog/blog.service';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {ReviewerService} from 'app/services/reviewer/reviewer.service';

declare var $: any;

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
    p: number = 1;
    blog: any;
    reviewer: any;
    @ViewChild('blogId') blogId: ElementRef;
    formReviewer: any;
    //blogId:any;

    // selectIdHandler (event: any) {
    //   this.blogId = event.target.value;
    //   console.log(this.blog,event)
    // }

    selectHandler(event: any) {
        this.formReviewer = event.target.value;

    }


    constructor(private blogService: BlogService, private router: Router, private activeRoute: ActivatedRoute, private reviewerService: ReviewerService) {
        this.blogService.showAllBlogs()
            .subscribe((data) => {
                this.blog = data;

            });

        this.reviewerService.showAllReviewers().subscribe((data) => {
            this.reviewer = data;

        });
    }

    ngOnInit(): void {
    }

    deleteBlog(id) {
        this.blogService.deleteBlog(id)
            .subscribe(() => {
                this.router.navigate(['/admin/blogs']);
                $.notify({
                    icon: "pe-7s-info",
                    message: 'blog is deleted'
                }, {
                    type: 'danger',
                    timer: 300,
                    placement: {
                        from: 'top',
                        align: 'center'
                    }
                });
            });
    }

    assignReviewer() {
        console.log(this.formReviewer, event)
        this.blogService.assignReviewer(this.blogId.nativeElement.value, this.formReviewer)
            .subscribe((datas) => {
                this.router.navigate(['/admin/blogs']);
                $.notify({
                    icon: "pe-7s-check",
                    message: 'Reviewer Assigned'
                }, {
                    type: 'success',
                    timer: 500,
                    placement: {
                        from: 'top',
                        align: 'center'
                    }
                });
            }, (error) => {
                this.router.navigate(['/admin/blogs']);
                $.notify({
                    icon: "pe-7s-info",
                    message: 'Assign error'
                }, {
                    type: 'danger',
                    timer: 500,
                    placement: {
                        from: 'top',
                        align: 'center'
                    }
                })
            });
    }

}
