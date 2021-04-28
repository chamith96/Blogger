import {Routes} from '@angular/router';
import {SearchComponent} from './search/search.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {BlogAddComponent} from './blog-add/blog-add.component';
import {BlogShowComponent} from './blog-show/blog-show.component';
import {BlogEditComponent} from './blog-edit/blog-edit.component';
import {AuthGuardService} from 'app/services/authGuard/auth-guard.service';

export const UserLayoutRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'search', component: SearchComponent},
    {
        path: 'user/:id',
        component: UserProfileComponent,
        canActivate: [AuthGuardService],
        data: {expectedRole: 'ROLE_USER'}
    },
    {
        path: 'blog/create',
        component: BlogAddComponent,
        canActivate: [AuthGuardService],
        data: {expectedRole: 'ROLE_USER'}
    },
    {path: 'blog/:id', component: BlogShowComponent},
    {
        path: 'blog/edit/:id',
        component: BlogEditComponent,
        canActivate: [AuthGuardService],
        data: {expectedRole: 'ROLE_USER'}
    }
];
