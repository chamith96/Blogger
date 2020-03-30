import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user/user.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  email:any;
  p: number = 1;
  emailbody:any;

  selectIdHandler (event: any) {
    this.emailbody = event.target.value;
    console.log(this.emailbody)
  }

  constructor(private userService:UserService) { 
    this.userService.showAllEmails().subscribe((data) => {
    this.email = data;  
    });
  }
  
  
  ngOnInit(): void {
  }

}
