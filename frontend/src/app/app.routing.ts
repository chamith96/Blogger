import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {AdminLayoutComponent} from './admin-layout/admin-layout.component';
import {UserLayoutComponent} from './user-layout/user-layout.component';

const routes: Routes = [
    {
        path: '',
        component: UserLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './user-layout/user-layout.module#UserLayoutModule'
            }]
    },
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './admin-layout/admin-layout.module#AdminLayoutModule'
            }]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [],
})
export class AppRoutingModule {
}
