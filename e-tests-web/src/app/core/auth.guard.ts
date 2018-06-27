import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //if (this.auth.isAuthenticated()) {
    //  // logged in so return true
    //   return true;
    //  }

    // not logged in so redirect to auth page with the return url
    // this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url }});
    this.router.navigate(['/auth']);
    return false;
  }
}
