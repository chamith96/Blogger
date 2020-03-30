import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    blogCount:number;
    userCount:number;
    assignCount:number;
    reviewerCount:number;
    assignStatusCount:number;

    public pieChartLabels:string[] = ['Blogs Count','Assigns','Not assigns'];
    public pieChartData:number[] = [];
    public pieChartColors: Array < any > = [{backgroundColor: ['blue', 'yellow', 'red']}];
    public pieChartType:string = 'pie';

    public pieChartLabels1:string[] = ['User not response','User Response'];
    public pieChartData1:number[] = [];
    public pieChartColors1: Array < any > = [{backgroundColor: ['red','green']}];
    public pieChartType1:string = 'pie';

  constructor(private dashBoard: DashboardService) { 
    this.dashBoard.countBlog().subscribe((data1) => {
      this.blogCount = Number(data1);
      this.pieChartData.push(this.blogCount);

      this.dashBoard.countUser().subscribe((data2) => {
        this.userCount = Number(data2);

        this.dashBoard.countReviewer().subscribe((data3) => {
          this.reviewerCount = Number(data3);

          this.dashBoard.countAssign().subscribe((data4) => {
            this.assignCount = Number(data4);
            this.pieChartData.push(this.assignCount);
            let notAssign:number =(this.blogCount) - (this.assignCount);
            this.pieChartData.push(notAssign);

            this.dashBoard.countAssignStatus().subscribe((data5) => {
              this.assignStatusCount = Number(data5);
              this.pieChartData1.push(this.assignStatusCount);
              let notStatusAssign:number =(this.assignCount) - (this.assignStatusCount);
              this.pieChartData1.push(notStatusAssign);              

            }); 
          });
        });
      });
    });
  }



  ngOnInit() {

    }

}
