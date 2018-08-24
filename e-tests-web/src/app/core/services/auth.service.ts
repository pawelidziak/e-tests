import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from 'firebase';
import {Observable} from 'rxjs/internal/Observable';
import * as firebase from 'firebase';


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

  // Logout
  public signOut() {
    this.afAuth.auth.signOut();
  }

  // Email password register / login
  public emailPasswordRegister(displayName: string, email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(success => {
        const user = firebase.auth().currentUser;
        user.sendEmailVerification().catch((error: any) => {
            throw new Error(error.message);
          }
        );
        this.updatePersonal(displayName).catch((error: any) => {
          throw new Error(error.message);
        });
      })
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }

  public emailPasswordLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(success => {
        if (success.user.emailVerified === false) {
          throw new Error('Email not verified.');
        } else {
          this._user = success.user;
        }
      })
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }

  // method updates user profile (not in database!)
  private updatePersonal(name: string) {
    const user = firebase.auth().currentUser;
    return user.updateProfile({
      displayName: name,
      photoURL: ''
    });
  }

  // Sends email allowing user to reset password
  public resetPassword(email: string) {
    const auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .catch((error: any) => {
        throw new Error((error.message));
      });
  }
}
