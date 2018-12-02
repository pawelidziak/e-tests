import {Component, Input, OnInit} from '@angular/core';
import {TestModel} from '../../../../core/models/Test';
import {ALL_ROUTES} from '../../../ROUTES';
import {Router} from '@angular/router';

@Component({
  selector: 'app-one-test-box',
  templateUrl: './one-test-box.component.html',
  styleUrls: ['./one-test-box.component.scss']
})
export class OneTestBoxComponent implements OnInit {

  @Input() oneBox: TestModel;
  private readonly MAX_TAGS_LENGTH = 30;

  public maxTags = 10;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  private calculateTagsLimit(): void {
    let charLength = 0;
    for (const tag of this.oneBox.tags) {
      charLength += tag.length + 3;     // + 3 because separator ' | '
      if (charLength < this.MAX_TAGS_LENGTH) {
        this.maxTags++;
      } else {
        return;
      }
    }
  }

  public calculateProgress(): number {
    if (this.oneBox.settings) {
      if ((this.oneBox.settings.progress && this.oneBox.settings.progress.masteredExercisesIds.length === 0) ||
        this.oneBox.exercises.length === 0) {
        return 0;
      }
      return this.oneBox.settings.progress.masteredExercisesIds.length / this.oneBox.exercises.length * 100;
    }
    return 0;
  }

  public navigateToTest(): void {
    this.router.navigate([`${ALL_ROUTES.CREATED_TEST}/${this.oneBox.id}`]);
  }
}
