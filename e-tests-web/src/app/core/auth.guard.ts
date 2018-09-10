import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './services/auth.service';
import {map, take} from 'rxjs/operators';
import {ALL_ROUTES} from '../shared/ROUTES';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private auth: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.currentUserObservable.pipe(map((auth) => {
        if (!auth) {
          console.log('no logged');
          this.router.navigate([ALL_ROUTES.DASHBOARD]);
          return false;
        }
        return true;
      }),
      take(1));
  }
}
