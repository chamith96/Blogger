import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarUserComponent } from './navbar-user.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [ RouterModule, CommonModule ],
  declarations: [ NavbarUserComponent ],
  exports: [ NavbarUserComponent ]
})

export class NavbarUserModule { }
