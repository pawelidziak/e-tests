import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from '../../core/models/Exercise';
import {FirebaseTimestamp} from "../../core/models/Test";

interface SortOption {
  value: string;
  viewValue: string;
}

enum sortOptionValue {
  ORIGINAL = 'Original',
  ALPHABETICALLY = 'alphabetically'
}

@Component({
  selector: 'app-display-exercises',
  templateUrl: './display-exercises.component.html',
  styleUrls: ['./display-exercises.component.scss']
})
export class DisplayExercisesComponent implements OnInit {

  @Input() exerciseList: Array<Exercise>;
  @Input() readonly editExercisesMode = false;
  @Input() readonly testId: string;

  public searchText: string;
  public sortOption: SortOption[];
  public selectedOption: SortOption;
  public addNewExercise = false;

  constructor() {
  }

  ngOnInit() {
    this.sortOption = [
      {value: sortOptionValue.ORIGINAL, viewValue: 'Original'},
      {value: sortOptionValue.ALPHABETICALLY, viewValue: 'Alphabetically'}
    ];
    this.selectedOption = this.sortOption[0];
  }

  public changeSortOption(): void {
    switch (this.selectedOption.value) {
      case sortOptionValue.ORIGINAL :
        this.exerciseList.sort((a, b) => a.createDate > b.createDate ? 1 : -1);
        break;
      case sortOptionValue.ALPHABETICALLY:
        this.exerciseList.sort((a, b) => a.question > b.question ? 1 : -1);
        break;
    }
  }

  public addExercise() {
    this.addNewExercise = true;
    const newExercise: Exercise = {
      question: '',
      answers: ['', ''],
      correctAnswer: 0,
      createDate: new Date().getTime()
    };
    this.exerciseList.push(newExercise);
  }

  public handleAddedExercise(exerciseWasAdded: boolean): void {
    this.addNewExercise = false;
    if (!exerciseWasAdded) {
      this.exerciseList.pop();
    }
  }

  public identifier = (index: number, item: any) => item.name;

}
