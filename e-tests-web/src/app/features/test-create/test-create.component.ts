import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService} from '../../core/services/header.service';
import {TestModel} from '../../core/models/Test';
import {AuthService} from '../../core/services/auth.service';
import {TestService} from '../../core/services/test.service';
import {Router} from '@angular/router';
import {ALL_ROUTES} from '../../shared/ROUTES';

@Component({
  selector: 'app-test-create',
  templateUrl: './test-create.component.html',
  styleUrls: ['./test-create.component.scss']
})
export class TestCreateComponent implements OnInit, OnDestroy {
  private readonly HEADER_TEXT = 'Create';
  private subscriptions: any = [];
  private testCreatedFlag = false;

  public checkTags = false;
  public newTest: TestModel;

  constructor(private headerService: HeaderService,
              private auth: AuthService,
              private testService: TestService,
              private router: Router) {
  }

  ngOnInit() {
    this.createEmptyTest();
    this.headerService.setCurrentRoute(['home', 'create']);
    this.isLoggedIn();
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  /**
   * If is not logged in - open auth dialog
   */
  private isLoggedIn() {
    this.subscriptions.push(this.auth.currentUserObservable.subscribe(
      res => {
        if (!res) {
          this.auth.openAuthDialog(true);
        } else {
          this.newTest.authorId = this.auth.currentUserId;
        }
      })
    );
  }

  /**
   * Method used by CanDeactivateGuard to show redirect alert
   */
  canDeactivate() {
    if (!this.testCreatedFlag && this.isUnsavedData()) {
      return window.confirm('Are you sure? Unsaved changes will be lost.');
    }
    return true;
  }

  public isUnsavedData(): boolean {
    return this.newTest.name.length > 0 || this.newTest.tags.length > 0 || this.newTest.desc.length > 0;
  }

  /**
   * TEST FUNCTIONALITY
   */
  private createEmptyTest(): void {
    this.newTest = {
      name: '',
      tags: [],
      desc: '',
      createDate: new Date().getTime(),
      authorId: '',
      isPublic: true,
      exercisesNumber: 0
    };
  }

  public saveTest(): void {
    this.checkTags = true;
    if (this.checkCreateTestCondition()) {
      this.testService.addTest(this.newTest)
        .then((createdTest) => {
          this.testCreatedFlag = true;
          this.router.navigate([`/${ALL_ROUTES.CREATED_TEST}/${createdTest.id}`]);
        })
        .catch(error => console.log(error));
    }
  }

  private checkCreateTestCondition(): boolean {
    return !(this.newTest.name.length === 0 || this.newTest.tags.length === 0);
  }
}
