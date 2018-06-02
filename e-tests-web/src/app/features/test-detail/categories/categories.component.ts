import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Category} from '../../../core/models/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @Input() testCategories: Array<Category>;

  public allCategories: Array<Category> = [];

  public selectable = true;
  public removable = true;

  public separatorKeysCodes = [ENTER, COMMA];

  public sectionCtrl = new FormControl();

  public filteredSections: Observable<any[]>;


  @ViewChild('sectionInput') sectionInput: ElementRef;

  constructor() {
    this.filteredSections = this.sectionCtrl.valueChanges.pipe(
      startWith(null),
      map((sectionName: string | Category | null) => sectionName ? this.filter(sectionName) : this.allCategories.slice()));
  }

  ngOnInit() {
    this.getCategories();
  }

  public addManually(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    const index = this.allCategories.findIndex(x =>
      x.name.toLocaleLowerCase().trim() === value.toLocaleLowerCase().trim());
    if (index !== -1) {
      const section = this.allCategories[index];
      if (!this.checkIfIsInTestSectionTab(section)) {
        this.testCategories.push(section);
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.sectionCtrl.setValue(null);
  }

  public addSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedSection: Category = event.option.value;
    if (!this.checkIfIsInTestSectionTab(selectedSection)) {
      this.testCategories.push(selectedSection);
    }
    this.sectionInput.nativeElement.value = '';
    this.sectionCtrl.setValue(null);
  }

  public removeSection(section: Category): void {
    const index = this.testCategories.indexOf(section);
    if (index >= 0) {
      this.testCategories.splice(index, 1);
    }
  }

  // TODO connect to db
  private getCategories(): void {

    for (let i = 0; i < 7; i++) {
      const section: Category = {
        id: `${i}`,
        name: `section-${i}`
      };
      this.allCategories.push(section);
    }

  }

  private filter(value: string | Category | null) {
    return this.allCategories.filter(x => {
      return x.name.toLowerCase().indexOf(typeof value === 'string' ? value.toLowerCase() : value.name.toLocaleLowerCase()) === 0;
    });
  }


  /**
   *      CHECKS
   */
  private checkIfIsInTestSectionTab(section: Category): boolean {
    return this.testCategories.indexOf(section) >= 0;
  }

}
