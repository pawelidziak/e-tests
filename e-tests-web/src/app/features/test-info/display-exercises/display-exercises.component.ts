import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from '../../../core/models/Exercise';

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

  public searchText: string;
  public sortOption: SortOption[];
  public selectedOption: SortOption;

  constructor() {
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
}
