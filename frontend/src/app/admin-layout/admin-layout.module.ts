import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {NgxPaginationModule} from 'ngx-pagination';
import { NguiMapModule} from '@ngui/map';
import { ChartsModule } from 'ng2-charts';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { BlogComponent } from './blog/blog.component';
import { AssignComponent } from './assign/assign.component';
import { EmailComponent } from './email/email.component';
import { ReviewerComponent } from './reviewer/reviewer.component';
import { SendEmailComponent } from './send-email/send-email.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    CKEditorModule,
    NgxPaginationModule,
    ChartsModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    BlogComponent,
    AssignComponent,
    EmailComponent,
    ReviewerComponent,
    SendEmailComponent
  ]
})

export class AdminLayoutModule {}
