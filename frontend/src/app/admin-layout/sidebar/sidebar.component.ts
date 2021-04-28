import {Component, OnInit} from '@angular/core';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    {path: '/admin/dashboard', title: 'Dashboard', icon: 'pe-7s-graph', class: ''},
    {path: '/admin/blogs', title: 'Blogs', icon: 'pe-7s-note2', class: ''},
    {path: '/admin/assigns', title: 'Assigns', icon: 'pe-7s-portfolio', class: ''},
    {path: '/admin/users', title: 'Users', icon: 'pe-7s-user', class: ''},
    {path: '/admin/reviewers', title: 'Reviewers', icon: 'pe-7s-users', class: ''},
    {path: '/admin/emails', title: 'Emails', icon: 'pe-7s-mail', class: ''}
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor() {
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
