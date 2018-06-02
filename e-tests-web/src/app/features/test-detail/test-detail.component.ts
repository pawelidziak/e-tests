import {Component, Input, OnInit} from '@angular/core';
import {Test} from '../../core/models/Test';
import {RWDService} from '../../core/services/RWD.service';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.scss']
})
export class TestDetailComponent implements OnInit {

  @Input() test: Test;
  public isSmallScreen = false;
  public savedClicked = false;

  constructor(private rwdService: RWDService) {
  }

  ngOnInit() {
    this.getRWDValue();
    console.log(this.test);
  }

  public saveTest(): void {
    this.savedClicked = true;
    if (!this.isInvalidTest()) {
      // TODO add to db
      console.log(this.test);
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
    return this.hasError(this.test.testName) ||
      this.hasError(this.test.categories) ||
      this.hasError(this.test.exercises);
  }
}
