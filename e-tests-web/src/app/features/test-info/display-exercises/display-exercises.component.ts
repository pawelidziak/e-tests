import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from '../../../core/models/Exercise';
import {ALL_ROUTES} from '../../../app.routing';
import {Router} from '@angular/router';

interface SortOption {
  value: string;
  viewValue: string;
}

enum sortOptionValue {
  NUMBER = 'number',
  ALPHABETICALLY = 'alphabetically'
}

@Component({
  selector: 'app-exercises-no-editable',
  templateUrl: './display-exercises.component.html',
  styleUrls: ['./display-exercises.component.scss']
})
export class DisplayExercisesComponent implements OnInit {

  @Input() exerciseList: Array<Exercise>;
  @Input() testId: string;

  public searchText: string;
  public sortOption: SortOption[];
  public selectedOption: SortOption;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.sortOption = [
      {value: sortOptionValue.NUMBER, viewValue: 'Number'},
      {value: sortOptionValue.ALPHABETICALLY, viewValue: 'Alphabetically'}
    ];
    this.selectedOption = this.sortOption[0];
  }

  public getLetterFromAscii(i: number): string {
    return String.fromCharCode(65 + i);
  }

  public changeSortOption(): void {
    switch (this.selectedOption.value) {
      case sortOptionValue.NUMBER:
        this.exerciseList.sort((a, b) => a.number > b.number ? 1 : -1);
        break;
      case sortOptionValue.ALPHABETICALLY:
        this.exerciseList.sort((a, b) => a.question > b.question ? 1 : -1);
        break;
    }
  }

  public navigateToEdit(): void {
    this.router.navigate([`${ALL_ROUTES.CREATED_TEST}/${this.testId}/${ALL_ROUTES.EDIT_TEST}`]);
  }
}
