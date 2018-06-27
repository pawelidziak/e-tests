import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from 'firebase';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class AuthService {

  private _user: User = null;

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((auth) => {
      this._user = auth;
    });
  }

  get currentUserAuthState(): Observable<any> {
    return this.afAuth.authState;
  }
}
