import {Component, OnInit, ViewChild} from '@angular/core';
import {NEWTest} from '../../core/models/Test';
import {HeaderService} from '../../core/services/header.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-test-create',
  templateUrl: './test-create.component.html',
  styleUrls: ['./test-create.component.scss'],

})
export class TestCreateComponent implements OnInit {
  private readonly HEADER_TEXT = 'Create';
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public testTags: string[] = [];
  public selectable = true;
  public removable = true;
  public addOnBlur = false;

  @ViewChild('chipList') chipList;

  public newTestForm: FormGroup;
  public newName = new FormControl('', Validators.required);
  public tags = new FormControl('', Validators.required);
  public desc = new FormControl();
  public author = new FormControl({value: '', disabled: true}, Validators.required);
  public createDate = new FormControl({value: '', disabled: true}, Validators.required);
  public availability = new FormControl({value: true, disabled: true}, Validators.required);


  constructor(private headerService: HeaderService) {
  }

  ngOnInit() {
    this.buildForm();
    this.headerService.setHeaderText(this.HEADER_TEXT);
  }

  /*
          Method used by CanDeactivateGuard to show redirect alert
   */
  canDeactivate() {
    if (this.checkUnsavedData()) {
      return window.confirm('Are you sure? Unsaved changes will be lost.');
    }
    return true;
  }

  private buildForm(): void {
    this.newTestForm = new FormGroup({
      newName: this.newName,
      tags: this.tags,
      desc: this.desc,
      author: this.author,
      createDate: this.createDate,
      availability: this.availability
    });
    // TODO get author from service
    this.author.setValue('Paweł Idziak');
    this.createDate.setValue(new Date().toLocaleDateString());
  }

  public checkUnsavedData(): boolean {
    return this.newName.value.length > 0 || this.testTags.length > 0;
  }

  public createTest(): void {
    this.checkTagsAndSetError();
    if (this.newTestForm.valid && this.testTags.length > 0) {
      console.log('tworze test');
    }
  }

  /*
          TAGS FUNCTIONALITY
    */
  public addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const tag = event.value;

    // Add tag if is correct
    console.log(this.checkTagCorrectness(tag));
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
    console.log(tag);
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
