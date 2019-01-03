import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs/internal/Observable';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import {ALL_ROUTES} from '@shared/routes';
import * as firebase from 'firebase/app';
import {AuthComponent} from '@core/components/auth/components/auth.component';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_PATH = 'users';
  private _user: any = null;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private dialog: MatDialog) {
    this.afAuth.authState.subscribe((auth) => this._user = auth);
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
    this.afAuth.auth.signOut();
    this.router.navigate([ALL_ROUTES.MAIN]);
  }

  // Email password register / login
  public emailPasswordRegister(displayName: string, email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(success => {
        this._user = success.user;
        this.setUserData(displayName);
      })
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }

  public emailPasswordLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(success => this._user = success.user)
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }

  public updateEmail(email: string): Promise<any> {
    return this._user.updateEmail(email);
  }

  // Sends email allowing user to toReset password
  public resetPassword(email: string): Promise<any> {
    const auth = this.afAuth.auth;
    return auth.sendPasswordResetEmail(email)
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
  }

  public loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this._user = credential.user;
        this.setUserData();
      })
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }

  private setUserData(displayName: string = this._user.displayName,
                      email: string = this._user.email,
                      photoURL: string = this._user.photoURL): void {
    const data = {
      displayName: displayName,
      email: email,
      photoURL: photoURL
    };

    const ref = this.afs.collection(this.USERS_PATH).doc(this.currentUserId).ref;
    ref.get()
      .then(docSnapshot => {
        if (!docSnapshot.exists) {
          ref.set(data)
            .catch(error => console.log(error));
          this._user.updateProfile({
              displayName: displayName,
              photoURL: photoURL
            }
          ).catch(error => {
            throw new Error(error.message);
          });
        }
      })
      .catch(error => console.log(error));
  }

  public updateCurrentUserData(displayName: string, photoURL: string): Promise<any> {
    const updateProfileAuth = this._user.updateProfile({
        displayName: displayName,
        photoURL: photoURL
      }
    );
    const updateProfileInFS = this.afs.collection(this.USERS_PATH)
      .doc(this.currentUserId)
      .update({displayName: displayName, photoURL: photoURL});

    return Promise.all([updateProfileAuth, updateProfileInFS]);
  }

  /**
   * Method checks if 'user' with given id exists in firestore, if not it navigate to 404 page
   * @param userId
   */
  private checkIfUserExists(userId: string): void {
    this.afs.doc(`${this.USERS_PATH}/${userId}`).ref.get()
      .then(docSnapshot => {
        if (!docSnapshot.exists) {
          this.router.navigate([ALL_ROUTES.MAIN]);
        }
      });
  }
}
