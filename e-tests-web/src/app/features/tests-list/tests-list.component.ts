import {Component, OnInit} from '@angular/core';
import {TestListService} from '../../core/services/test-list.service';
import {MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs/index';
import {HeaderButtonType, HeaderService} from '../../core/services/header.service';
import {Router} from '@angular/router';
import {TestShortInfo} from '../../core/models/TestShortInfo';

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.scss']
})
export class TestsListComponent implements OnInit {

  private source$: Subscription;
  public dataSource: MatTableDataSource<TestShortInfo>;

  constructor(private testListService: TestListService,
              private headerService: HeaderService,
              private router: Router) {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.getTestsList();
  }

  public navigateToTest(test: TestShortInfo): void {
    this.testListService.saveCurrentTest(test);
    this.router.navigateByUrl(`/test-info/${test.testId}`);
  }

  private getTestsList(): void {
    this.source$ = this.testListService.getTestsList().subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res);
        this.headerService.setHeaderButtonAndText(HeaderButtonType.HOME, '');
      },
      error => console.log(error)
    );
  }

}
