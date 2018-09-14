import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Exercise} from '../../core/models/Exercise';
import {AuthService} from '../../core/services/auth.service';
import {listAnimation} from '../../shared/animations';
import {ScrollService} from '../../core/services/scroll.service';
import {ALL_ROUTES} from '../../shared/ROUTES';
import {Router} from "@angular/router";

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
export class DisplayExercisesComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];

  @Input() exerciseList: Array<Exercise>;
  @Input() readonly authorId: string;
  @Input() readonly editExercisesMode = false;
  @Input() readonly testId: string;
  @ViewChild('startList') startList: ElementRef;

  public readonly lastExerciseId = 'lastExercise';
  public searchText: string;
  public sortOption: SortOption[];
  public selectedOption: SortOption;
  public addNewExercise = false;
  public expandAllExercises = false;
  public fixedAddButton = false;

  constructor(private scrollService: ScrollService,
              public auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.setSortOption();
    this.checkScrollPos();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  /**
   * INIT METHODS
   */

  private setSortOption(): void {
    this.sortOption = [
      {value: sortOptionValue.ORIGINAL, viewValue: 'Original'},
      {value: sortOptionValue.ALPHABETICALLY, viewValue: 'Alphabetically'}
    ];
    this.selectedOption = this.sortOption[0];
  }

  private checkScrollPos(): void {
    this.subscriptions.push(
      this.scrollService.scrollPosition.subscribe(
        res => this.fixedAddButton = this.startList && res >= this.startList.nativeElement.offsetTop - 40
      )
    );
  }

  /**
   * FUNCTIONAL METHODS
   */

  public changeSortOption(): void {
    // TODO
    // switch (this.selectedOption.value) {
    //   case sortOptionValue.ORIGINAL :
    //     this.exerciseList.sort((a, b) => a.createDate > b.createDate ? 1 : -1);
    //     break;
    //   case sortOptionValue.ALPHABETICALLY:
    //     this.exerciseList.sort((a, b) => a.question > b.question ? 1 : -1);
    //     break;
    // }
  }

  public addExercise(): void {
    if (this.exerciseList.length > 0) {
      this.scrollToLastExercise();
    }

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

  private scrollToLastExercise(): void {
    const element = document.querySelector(`#${this.lastExerciseId}`);
    element.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  public scrollTop(): void {
    const element = document.querySelector('#testInfoSection') || document.querySelector('#testEditSection');
    element.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  /**
   * HELPERS
   */
  public identifier = (index: number, item: Exercise) => item.createDate;

  public navigateToLearn(): void {
    this.router.navigate([`${ALL_ROUTES.CREATED_TEST}/${this.testId}/${ALL_ROUTES.TEST_LEARN}`]);
  }
}
