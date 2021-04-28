import {Component, OnInit} from '@angular/core';
import {BlogService} from 'app/services/blog/blog.service';

declare var $: any;

@Component({
    selector: 'app-assign',
    templateUrl: './assign.component.html',
    styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {
    assign: any;
    p: number = 1;

    constructor(private blogService: BlogService) {
        this.blogService.showAllAssigns().subscribe((data) => {
            this.assign = data;
            console.log(this.assign)
        });
    }

    message(msg) {
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

    ngOnInit(): void {
    }

}
