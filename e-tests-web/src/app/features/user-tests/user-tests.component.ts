import {Component, OnDestroy, OnInit} from '@angular/core';
import {TestModel} from '../../core/models/Test';
import {AuthService} from '../../core/services/auth.service';
import {TestService} from '../../core/services/test.service';
import {LoaderService} from '../../core/services/loader.service';

@Component({
  selector: 'app-user-tests',
  templateUrl: './user-tests.component.html',
  styleUrls: ['./user-tests.component.scss']
})
export class UserTestsComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];

  private userLogged: boolean;
  public userTests: TestModel[];
  public searchTest: string;

  constructor(private testService: TestService,
              private loader: LoaderService,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.loader.start();
    this.isLoggedIn();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  private isLoggedIn() {
    this.subscriptions.push(this.auth.currentUserObservable.subscribe(
      res => {
        this.userLogged = !!res;
        this.getUserTests();
      })
    );
  }

  private getUserTests(): void {
    this.subscriptions.push(
      this.testService.getTests().subscribe(
        res => {
          this.userTests = res;
          if (this.userLogged) {
            this.getTestSettings();
          } else {
            this.loader.complete();
          }
        },
        error => console.log(error)
      )
    )
    ;
  }

  private getTestSettings() {
    for (const test of this.userTests) {
      this.subscriptions.push(
        this.testService.getTestSettings(test.id).subscribe(
          res => {
            test.settings = res;
            this.loader.complete();
          }, error => console.log(error)
        ));
    }
  }
}
