import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService} from '../../core/services/header.service';
import {AppSettingsService} from '../../core/services/app-settings.service';
import {AuthService} from '../../core/services/auth.service';
import {LoaderService} from '../../core/services/loader.service';
import {User} from '../../core/models/User';
import {AngularFireStorage} from 'angularfire2/storage';
import {finalize} from 'rxjs/operators';

const USER_AVATARS_PATH = 'userAvatars';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  public owner: User;
  public editMode: boolean;

  public errorMsg: string;
  public responseMsg: string;
  public fileOnLoad: boolean;
  public isHovering: boolean;
  public previewUrl: string;
  private selectedFile: File;

  constructor(private headerService: HeaderService,
              private storage: AngularFireStorage,
              private auth: AuthService,
              public loader: LoaderService,
              public appSettings: AppSettingsService) {
  }

  ngOnInit() {
    this.getCurrentUser();
    this.headerService.setCurrentRoute([
      {label: 'user-profile-title', path: ''}
    ]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private getCurrentUser(): void {
    this.loader.start();
    this.subscriptions.push(
      this.auth.currentUserObservable.subscribe(
        res => {
          this.owner = res as User;
          this.owner = {
            uid: res.uid,
            email: res.email,
            displayName: res.displayName,
            photoURL: res.photoURL
          };
          this.loader.complete();
        }, () => this.loader.complete()
      )
    );
  }

  public savePersonal(): void {
    this.fileOnLoad = true;
    // SAVE PHOTO URL AND DISPLAY NAME
    if (this.selectedFile && this.previewUrl) {
      const path = `${USER_AVATARS_PATH}/${this.auth.currentUserId}`;
      const fileUploadRef = this.storage.ref(path);
      const task = this.storage.upload(path, this.selectedFile);
      this.subscriptions.push(
        task.snapshotChanges().pipe(
          finalize(() => {
              this.subscriptions.push(fileUploadRef.getDownloadURL().subscribe(url => {
                this.savePersonalToFS(this.owner.displayName, url);
                this.owner.photoURL = url;
              }));
              this.clearSelectFile();
            }
          )).subscribe()
      );
    } else {
      // SAVE JUST DISPLAY NAME
      this.savePersonalToFS(this.owner.displayName, this.owner.photoURL);
    }
    this.editMode = false;
  }

  public getFile(event: FileList): void {
    this.errorMsg = '';
    this.responseMsg = '';
    this.clearSelectFile();
    const file = event.item(0);

    if (!this.checkType(file)) {
      this.errorMsg = 'user-profile-error-type';
      return;
    }
    if (!this.checkSize(file)) {
      this.errorMsg = 'user-profile-error-size';
      return;
    }

    this.selectedFile = file;
    this.readFile();
  }

  public clearSelectFile(): void {
    this.selectedFile = null;
    this.previewUrl = '';
  }

  private checkType(file: File): boolean {
    return file.type.split('/')[0] === 'image';
  }

  private checkSize(file: File): boolean {
    return file.size <= 1000000;
  }

  private savePersonalToFS(displayName: string, photoURL: string): void {
    this.auth.updateCurrentUserData(displayName, photoURL)
      .then((res) => {
        this.errorMsg = '';
        this.responseMsg = 'change-success';
        this.fileOnLoad = false;
      })
      .catch(() => {
        this.responseMsg = '';
        this.errorMsg = 'error-general';
        this.fileOnLoad = false;
      });
  }

  public resetPassword(): void {
    this.auth.resetPassword(this.owner.email)
      .then(() => {
        this.errorMsg = '';
        this.responseMsg = 'instructions-send-to-email';
      })
      .catch(() => {
        this.responseMsg = '';
        this.errorMsg = 'error-general';
      });
  }

  public toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  private readFile(): void {
    const reader = new FileReader();
    reader.onload = (progressEvent: any) => {
      this.previewUrl = progressEvent.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

}
