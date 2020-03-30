import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    // this will be passed from the route config on the data property
    const expectedRole:String = route.data.expectedRole;

    if (this.authService.isTokenExpired() || this.authService.getRoleFromToken() !== expectedRole) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
   }
}
