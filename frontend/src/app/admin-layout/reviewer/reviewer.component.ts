import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ReviewerService} from 'app/services/reviewer/reviewer.service';

declare var $: any;

@Component({
    selector: 'app-reviewer',
    templateUrl: './reviewer.component.html',
    styleUrls: ['./reviewer.component.css']
})
export class ReviewerComponent implements OnInit {
    p: number = 1;
    reviewer: any;
    reviewerId: any;
    userName: String;
    userPosition: String;
    userOraganiztion: String;
    reviewerEdit: any;
    editName: String;
    editPosition: String;
    editOraganiztion: String;

    selectIdHandler(event: any) {
        this.reviewerId = event.target.value;
        this.reviewerService.showReviewerById(this.reviewerId)
            .subscribe((data) => {
                this.reviewerEdit = data;
                this.editName = this.reviewerEdit.name;
                this.editPosition = this.reviewerEdit.position;
                this.editOraganiztion = this.reviewerEdit.organization
            });
    }

    constructor(private router: Router, private activeRoute: ActivatedRoute, private reviewerService: ReviewerService) {
        this.reviewerService.showAllReviewers().subscribe((data) => {
            this.reviewer = data;
        });
    }

    ngOnInit(): void {
    }

    deleteReviewer(rid) {
        this.reviewerService.deleteReviewer(rid).subscribe(() => {
            this.router.navigate(['/admin/reviewers']);
            this.errMessage("Reviewer is deleted");
        });
    }

    addReviewer() {
        let reviewer = {
            name: this.userName,
            position: this.userPosition,
            organization: this.userOraganiztion
        };
        this.reviewerService.addReviewer(reviewer).subscribe(() => {
            this.router.navigate(['/admin/reviewers']);
            this.message("Reviewer is added");
        });
    }

    editReviewer() {
        let reviewer = {
            name: this.editName,
            position: this.editPosition,
            organization: this.editOraganiztion
        };
        this.reviewerService.editReviewer(reviewer, this.reviewerId)
            .subscribe(() => {
                this.router.navigate(['/admin/reviewers']);
                this.message("Reviewer is updated");
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

    errMessage(msg) {
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
