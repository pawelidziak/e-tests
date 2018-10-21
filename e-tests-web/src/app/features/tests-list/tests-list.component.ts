import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TestModel} from '../../core/models/Test';
import {ALL_ROUTES} from '../../shared/ROUTES';

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.scss'],
})
export class TestsListComponent implements OnInit {

  @Input() testList: Array<TestModel>;
  @Input() searchText: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  public navigateToTest(testId: string): void {
    this.router.navigate([`${ALL_ROUTES.CREATED_TEST}/${testId}`]);
  }


}
