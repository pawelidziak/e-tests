import {Component, Input, OnInit} from '@angular/core';
import {NEWTest} from '../../core/models/Test';
import {RWDService} from '../../core/services/RWD.service';
import {Exercise} from '../../core/models/Exercise';
import {fadeInAnimation} from "../../shared/animations";

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.scss'],
  animations: [fadeInAnimation()]
})
export class TestDetailComponent implements OnInit {

  @Input() testInfo: NEWTest;
  @Input() testExercises: Array<Exercise>;
  public isSmallScreen = false;
  public savedClicked = false;

  constructor(private rwdService: RWDService) {
  }

  ngOnInit() {
    this.getRWDValue();
    console.log(this.testInfo);
  }

  public saveTest(): void {
    this.savedClicked = true;
    if (!this.isInvalidTest()) {
      // TODO add to db
      console.log(this.testInfo);
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
