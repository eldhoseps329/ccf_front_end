import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let userData=(localStorage.getItem("userData"))?JSON.parse(localStorage.getItem("userData")):{};
    if (userData && userData.token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}