import {Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {UserComponent} from './user/user.component';
import {AuthGuardService} from 'app/services/authGuard/auth-guard.service';
import {AssignComponent} from './assign/assign.component';
import {BlogComponent} from './blog/blog.component';
import {EmailComponent} from './email/email.component';
import {ReviewerComponent} from './reviewer/reviewer.component';
import {SendEmailComponent} from './send-email/send-email.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: 'admin/dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuardService],
        data: {expectedRole: 'ROLE_ADMIN'}
    },
    {
        path: 'admin/users',
        component: UserComponent,
        canActivate: [AuthGuardService],
        data: {expectedRole: 'ROLE_ADMIN'}
    },
    {
        path: 'admin/blogs',
        component: BlogComponent,
        canActivate: [AuthGuardService],
        data: {expectedRole: 'ROLE_ADMIN'}
    },
    {
        path: 'admin/reviewers',
        component: ReviewerComponent,
        canActivate: [AuthGuardService],
        data: {expectedRole: 'ROLE_ADMIN'}
    },
    {
        path: 'admin/emails',
        component: EmailComponent,
        canActivate: [AuthGuardService],
        data: {expectedRole: 'ROLE_ADMIN'}
    },
    {
        path: 'admin/users/emails/:id',
        component: SendEmailComponent,
        canActivate: [AuthGuardService],
        data: {expectedRole: 'ROLE_ADMIN'}
    },
    {
        path: 'admin/assigns',
        component: AssignComponent,
        canActivate: [AuthGuardService],
        data: {expectedRole: 'ROLE_ADMIN'}
    }
];
