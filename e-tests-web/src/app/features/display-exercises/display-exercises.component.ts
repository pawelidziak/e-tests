import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Exercise} from '../../core/models/Exercise';
import {AuthService} from '../../core/services/auth.service';
import {listAnimation} from '../../shared/animations';

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
  styleUrls: ['./display-exercises.component.scss'],
  animations: [listAnimation()]
})
export class DisplayExercisesComponent implements OnInit {

  @Input() exerciseList: Array<Exercise>;
  @Input() readonly authorId: string;
  @Input() readonly editExercisesMode = false;
  @Input() readonly testId: string;

  public searchText: string;
  public sortOption: SortOption[];
  public selectedOption: SortOption;
  public addNewExercise = false;
  public expandAllExercises = false;

  constructor(public auth: AuthService) {
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
    if (!this.addNewExercise) {
      this.addNewExercise = true;
      const newExercise: Exercise = {
        question: '',
        answers: ['', ''],
        correctAnswer: 0,
        createDate: new Date().getTime()
      };
      this.exerciseList.push(newExercise);
    }
  }

  public handleAddedExercise(exerciseWasAdded: boolean): void {
    this.addNewExercise = false;
    if (!exerciseWasAdded) {
      this.exerciseList.pop();
    }
  }

  public identifier = (index: number, item: any) => item.name;
}
