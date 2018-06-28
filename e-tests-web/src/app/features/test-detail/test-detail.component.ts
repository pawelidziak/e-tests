import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NEWTest} from '../../core/models/Test';
import {RWDService} from '../../core/services/RWD.service';
import {Exercise} from '../../core/models/Exercise';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.scss']
})
export class TestDetailComponent implements OnInit {

  @Input() testInfo: NEWTest;
  @Input() testExercises: Array<Exercise>;
  @Output() testSaved: EventEmitter<boolean> = new EventEmitter();

  public isSmallScreen = false;
  public savedClicked = false;

  private testInfoOrig: NEWTest;
  private testExercisesOrig: Array<Exercise>;

  constructor(private rwdService: RWDService,
              private router: Router) {
  }

  ngOnInit() {
    this.getRWDValue();
    this.testInfoOrig = {...this.testInfo};
    this.testExercisesOrig = {...this.testExercises};

    const routeSub$ = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // save your data
        console.log('save');
      }
    });
  }

  public saveTest(): void {
    this.savedClicked = true;
    if (!this.isInvalidTest()) {
      // TODO add to db
    }
  }

  private getRWDValue(): void {
    const RWDsub$ = this.rwdService.isSmallScreen.subscribe(res => {
      this.isSmallScreen = res;
    });
  }

  public hasError(value: any): boolean {
    if (this.savedClicked) {
      return typeof value === 'string' ? value.trim().length === 0 : value.length === 0;
    } else {
      return false;
    }
  }

  private isInvalidTest(): boolean {
    return this.hasError(this.testInfo.testName) ||
      this.hasError(this.testInfo.categories) ||
      this.hasError(this.testExercises);
  }

}
