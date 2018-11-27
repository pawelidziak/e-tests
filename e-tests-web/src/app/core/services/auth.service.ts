import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from 'firebase';
import {Observable} from 'rxjs/internal/Observable';
import {MatDialog} from '@angular/material';
import {AuthComponent} from '../../features/auth/auth.component';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {ALL_ROUTES} from '../../shared/ROUTES';
import {AngularFirestore} from 'angularfire2/firestore';


@Injectable()
export class AuthService {

  private _user: User = null;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private dialog: MatDialog) {
    const sub$ = this.afAuth.authState.subscribe(auth => {
      this._user = auth;
    });
  }

  get currentUserObservable(): Observable<any> {
    return this.afAuth.authState;
  }


  // Returns true if user is logged in
  get isAuthenticated(): boolean {
    return this._user !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.isAuthenticated ? this._user : null;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.isAuthenticated ? this._user.uid : '';
  }


  // Logout
  public signOut() {
    this.router.navigate([ALL_ROUTES.DASHBOARD])
      .then(() => {
        this.afAuth.auth.signOut()
          .catch(error => console.log(error));
      });
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
        this.updateUserData();
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

  // Sends email allowing user to toReset password
  public resetPassword(email: string): Promise<any> {
    const auth = this.afAuth.auth;
    return auth.sendPasswordResetEmail(email)
      .catch((error: any) => {
        throw new Error((error.message));
      });
  }

  public updateEmail(email: string): Promise<any> {
    const auth = this.afAuth.auth;
    return auth.currentUser.updateEmail(email)
      .catch((error: any) => {
        throw new Error((error.message));
      });
  }

  public openAuthDialog(disableClose: boolean): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      data: {
        disableClose: disableClose
      }
    });

    // const sub$ = dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed = ' + result);
    // });
  }

  public loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this._user = credential.user;
        this.updateUserData();
        console.log(this._user);
      })
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }

  private updateUserData(): void {
    const data = {
      email: this._user.email,
      displayName: this._user.displayName,
      photoURL: this._user.photoURL
    };

    const ref = this.afs.collection('users').doc(this.currentUserId).ref;
    ref.get()
      .then(docSnapshot => {
        if (!docSnapshot.exists) {
          ref.set(data)
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error));
  }

}
