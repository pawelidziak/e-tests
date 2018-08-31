import {Component, OnInit, ViewChild} from '@angular/core';
import {HeaderService} from '../../core/services/header.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TestCreate} from '../../core/models/Test';
import {AuthService} from '../../core/services/auth.service';
import {NewTestService} from '../../core/services/NewTest.service';
import {Router} from '@angular/router';
import {ALL_ROUTES} from '../../app.routing';

@Component({
  selector: 'app-test-create',
  templateUrl: './test-create.component.html',
  styleUrls: ['./test-create.component.scss'],

})
export class TestCreateComponent implements OnInit {
  private readonly HEADER_TEXT = 'Create';
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  /*
    Tags variables
   */
  @ViewChild('chipList') chipList;
  public selectable = true;
  public removable = true;
  public addOnBlur = false;
  public testTags: string[] = [];
  public createTestForm: FormGroup;

  private testCreatedFlag = false;

  constructor(private headerService: HeaderService,
              private auth: AuthService,
              private testService: NewTestService,
              private router: Router) {
  }

  ngOnInit() {
    this.buildForm();
    this.headerService.setHeaderText(this.HEADER_TEXT);
    this.isLoggedIn();
  }

  private buildForm(): void {
    this.createTestForm = new FormGroup({
      name: new FormControl('', Validators.required),
      tags: new FormControl(this.testTags),
      desc: new FormControl(''),
      createDate: new FormControl({value: new Date(), disabled: true}, Validators.required),
      isPublic: new FormControl({value: true, disabled: true}, Validators.required)
    });
  }

  /**
   * If is not logged in - open auth dialog
   */
  private isLoggedIn() {
    const sub$ = this.auth.currentUserObservable.subscribe(
      res => {
        if (!res) {
          this.auth.openAuthDialog(true);
        }
      }
    );
  }

  /**
   Method used by CanDeactivateGuard to show redirect alert
   */
  canDeactivate() {
    if (!this.testCreatedFlag && this.checkUnsavedData()) {
      return window.confirm('Are you sure? Unsaved changes will be lost.');
    }
    return true;
  }

  public checkUnsavedData(): boolean {
    return this.createTestForm.get('name').value.length > 0 || this.testTags.length > 0;
  }


  /*
          TEST FUNCTIONALITY
    */
  public saveTest(): void {
    this.checkTagsAndSetError();
    if (this.createTestForm.valid && this.testTags.length > 0) {
      const sub$ = this.testService.addTest(this.createTest())
        .then((createdTest) => {
          this.testCreatedFlag = true;
          this.router.navigate([`/${ALL_ROUTES.CREATED_TEST}/${createdTest.id}`]);
        })
        .catch(error => console.log(error));
    }
  }

  private createTest(): TestCreate {
    return {
      name: this.createTestForm.get('name').value,
      tags: this.createTestForm.get('tags').value,
      desc: this.createTestForm.get('desc').value,
      createDate: this.createTestForm.get('createDate').value,
      authorId: this.auth.currentUserId,
      isPublic: this.createTestForm.get('isPublic').value
    };
  }

  /*
          TAGS FUNCTIONALITY
    */
  public addTag(input: any): void {
    const tag = input.value;

    // Add tag if is correct
    if (this.checkTagCorrectness(tag)) {
      this.testTags.push(tag.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    // check tags correctness
    this.checkTagsAndSetError();
  }

  public removeTag(tag: any): void {
    const index = this.testTags.indexOf(tag);
    if (index >= 0) {
      this.testTags.splice(index, 1);
    }
    // check tags correctness
    this.checkTagsAndSetError();
  }

  private checkTagCorrectness(tag: string): boolean {
    // check if tag exists, if it's letter or number and if its new
    return (tag || '').trim() &&
      tag.match(/^[0-9a-zA-Z-\s]+$/) &&
      this.testTags.indexOf(tag) === -1;
  }

  private checkTagsAndSetError(): void {
    if (this.testTags.length > 0) {
      this.chipList.errorState = false;
    } else if (this.testTags.length === 0) {
      this.chipList.errorState = true;
    }
  }

}
