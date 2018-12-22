import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '@core/services';
import {map, take} from 'rxjs/operators';
import {ALL_ROUTES} from '@shared/routes';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private auth: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.currentUserObservable.pipe(map((auth) => {
        if (!auth) {
          this.router.navigate([ALL_ROUTES.MAIN]);
          return false;
        }
        return true;
      }),
      take(1));
  }
}
