import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {UserLayoutRoutes} from './user-layout.routing';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {NgxPaginationModule} from 'ngx-pagination';

import {UserProfileComponent} from './user-profile/user-profile.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {BlogAddComponent} from './blog-add/blog-add.component';
import {BlogShowComponent} from './blog-show/blog-show.component';
import {BlogEditComponent} from './blog-edit/blog-edit.component';
import {SearchComponent} from './search/search.component';

@NgModule({
    declarations: [
        UserProfileComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        BlogAddComponent,
        BlogShowComponent,
        BlogEditComponent,
        SearchComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(UserLayoutRoutes),
        FormsModule,
        CKEditorModule,
        NgxPaginationModule
    ]
})
export class UserLayoutModule {
}
