import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt'; 

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './admin-layout/shared/navbar/navbar.module';
import { FooterModule } from './admin-layout/shared/footer/footer.module';
import { NavbarUserModule } from './user-layout/navbar-user/navbar-user.module';
import { SidebarModule } from './admin-layout/sidebar/sidebar.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';

import { AuthService } from './services/auth/auth.service';
import { BlogService } from './services/blog/blog.service';
import { UserService } from './services/user/user.service';
import { ReviewerService } from './services/reviewer/reviewer.service';
import { DashboardService } from './services/dashboard/dashboard.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    NavbarUserModule,
    AppRoutingModule,
    BrowserModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8082']  
      }
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserLayoutComponent
  ],
  providers: [
    AuthService,
    BlogService,
    UserService,
    ReviewerService,
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
