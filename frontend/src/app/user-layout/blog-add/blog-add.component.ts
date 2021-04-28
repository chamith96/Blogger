import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Router} from '@angular/router';
import {BlogService} from 'app/services/blog/blog.service';

declare var $: any;

@Component({
    selector: 'app-blog-add',
    templateUrl: './blog-add.component.html',
    styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent implements OnInit {

    constructor(private blogService: BlogService, private router: Router) {

    }

    ngOnInit(): void {

    }

    public Editor = ClassicEditor;
    blogContent: String = '';
    blogTitle: String;
    blogData: any;

    @Input() multiple: boolean = false;
    @ViewChild('fileInput') inputEl: ElementRef;

    blogSubmit() {
        const blog = {
            content: this.blogContent,
            title: this.blogTitle,
        };

        this.blogService.submitBlog(blog).subscribe((data) => {
            let inputEl: HTMLInputElement = this.inputEl.nativeElement;
            this.blogData = data;
            if (inputEl.files[0]) {
                this.blogService.uploadImage(this.blogData.bid, inputEl.files.item(0)).subscribe((datam) => {
                    this.router.navigate(['/blog/' + this.blogData.bid]);
                    this.successMessage("Blog created with a image upload");
                }, (erro) => {
                    this.failMessage("file upload fail");
                });
            } else {
                this.router.navigate(['/blog/' + this.blogData.bid]);
                this.successMessage("Blog created");
            }

        }, (error) => {
            this.failMessage("Blog creation fail");
        });
    }

    successMessage(msg) {
        $.notify({
            icon: "pe-7s-check",
            message: msg
        }, {
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
        }, {
            type: 'danger',
            timer: 500,
            placement: {
                from: 'top',
                align: 'center'
            }
        });
    }


}
