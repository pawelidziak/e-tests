import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/internal/Observable';
import {ALL_ROUTES} from '../../shared/ROUTES';
import {Router} from '@angular/router';
import {User} from '../models/User';

@Injectable()
export class UserService {

  private readonly USERS_PATH = 'users';

  constructor(private readonly afs: AngularFirestore,
              private readonly router: Router) {
  }

  public getUserById(userId: string): Observable<User> {
    this.checkIfUserExists(userId);
    return this.afs.doc<User>(`${this.USERS_PATH}/${userId}`).valueChanges();
  }

  /**
   * Method checks if 'user' with given id exists in firestore, if not it navigate to 404 page
   * @param {userId} userId
   */
  private checkIfUserExists(userId: string): void {
    this.afs.doc(`${this.USERS_PATH}/${userId}`).ref.get()
      .then(docSnapshot => {
        if (!docSnapshot.exists) {
          this.router.navigate([ALL_ROUTES.DASHBOARD]);
        }
      });
  }

}
