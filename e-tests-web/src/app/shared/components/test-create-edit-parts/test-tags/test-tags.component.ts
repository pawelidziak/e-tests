import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipList} from '@angular/material';

@Component({
  selector: 'app-test-tags',
  templateUrl: './test-tags.component.html',
  styleUrls: ['./test-tags.component.scss']
})
export class TestTagsComponent implements OnInit, OnChanges {
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() testTags: any[];
  @Input() checkError: boolean;
  @Input() disabled = false;
  @Input() width100 = false;
  @Input() margins = false;
  @Input() color = 'primary';
  @Input() appearance = 'standard';
  @Input() private hasError: boolean;
  @Output() testTagsChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  @ViewChild('chipList') public chipList: MatChipList;

  public selectable = true;
  public removable = true;
  public addOnBlur = false;

  constructor() {
  }

  ngOnInit() {
  }
  /*
           TAGS FUNCTIONALITY
     */
  public addTag(input: any): void {
    const tag = input.value;
    this.checkError = true;
    // Add tag if is correct
    if (this.checkTagCorrectness(tag)) {
      this.testTags.push(tag.trim());
      this.testTagsChange.emit(this.testTags);
    }
    // Reset the input name
    if (input) {
      input.value = '';
    }
    // checkError testTags correctness
    this.checkTagsAndSetError();
  }

  public removeTag(tag: any): void {
    const index = this.testTags.indexOf(tag);
    if (index >= 0) {
      this.testTags.splice(index, 1);
    }
    // checkError testTags correctness
    this.checkTagsAndSetError();
  }

  private checkTagCorrectness(tag: string): boolean {
    // checkError if tag exists, if it's letter or number and if its new
    return (tag || '').trim() &&
      tag.match(/^[0-9a-zA-Z-\s]+$/) &&
      this.testTags.indexOf(tag) === -1;
  }

  public checkTagsAndSetError(): void {
    if (this.testTags.length > 0) {
      this.chipList.errorState = false;
    } else if (this.testTags.length === 0 && this.checkError) {
      this.chipList.errorState = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkTagsAndSetError();
  }


}
