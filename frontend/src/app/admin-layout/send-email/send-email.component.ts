import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from 'app/services/user/user.service';

declare var $:any;

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  public Editor = ClassicEditor;
  emailTitle:String;
  emailBody:String=" ";

  constructor(private router: Router,private activeRoute:ActivatedRoute, private userService:UserService) { }

  ngOnInit(): void {
  }

  sendEmail() {
    let htmlString= "<div>"+this.emailBody+"</div>";
    let stripedHtml = $("<div>").html(htmlString).text();

    const email = {
      title: this.emailTitle,
      body: stripedHtml
    };

    this.userService.sendEmailUser(email,this.activeRoute.snapshot.params['id'])
    .subscribe((data) => {
      this.router.navigate(['/admin/blogs']);
      $.notify({
        icon: "pe-7s-check",
        message: 'email is sent'
    },{
        type: 'success',
        timer: 500,
        placement: {
            from: 'top',
            align: 'center'
        }
    });
    },(error) =>{
      this.router.navigate(['/admin/blogs']);
      $.notify({
        icon: "pe-7s-info",
        message: 'email sending fail'
    },{
        type: 'danger',
        timer: 500,
        placement: {
            from: 'top',
            align: 'center'
        }
    });
    });
  }

}
