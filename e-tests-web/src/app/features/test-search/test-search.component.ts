import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/internal/Subscription';
import {Router} from '@angular/router';
import {TestModel} from '../../core/models/Test';
import {HeaderService} from '../../core/services/header.service';
import {TestService} from '../../core/services/test.service';
import {LoaderService} from '../../core/services/loader.service';

interface SortOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-test-search',
  templateUrl: './test-search.component.html',
  styleUrls: ['./test-search.component.scss']
})
export class TestSearchComponent implements OnInit, OnDestroy {
  private subscription$: Subscription;

  public testList: TestModel[];
  public searchText: string;

  public sortOptions: SortOption[] = [
    {
      label: 'Date (DESC)',
      value: 'date-desc'
    },
    {
      label: 'Date (ASC)',
      value: 'date-asc'
    },
    {
      label: 'Rate (DESC)',
      value: 'rate-desc'
    },
    {
      label: 'Rate (ASC)',
      value: 'rate-asc'
    }
  ];
  public selectedSortOption: SortOption = {
    label: 'Date (DESC)',
    value: 'date-desc'
  };

  constructor(private headerService: HeaderService,
              private router: Router,
              private testService: TestService,
              private loader: LoaderService) {
    this.loader.start();
  }

  ngOnInit() {
    this.getTestsList();
    this.headerService.setCurrentRoute(['home', 'search']);
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  private getTestsList(): void {
    this.subscription$ = this.testService.getTests().subscribe(
      res => {
        this.testList = res;
        this.loader.complete();
      },
      error => {
        console.log(error);
        this.loader.complete();
      }
    );
  }

  public sortTestList(): void {
    switch (this.selectedSortOption.value) {
      // Date (DESC)
      case this.sortOptions[0].value:
        this.testList.sort((a, b) => a.createDate > b.createDate ? -1 : 1);
        break;
      // Date (ASC)
      case this.sortOptions[1].value:
        this.testList.sort((a, b) => a.createDate > b.createDate ? 1 : -1);
        break;
      // Rate (DESC)
      case this.sortOptions[2].value:
        // this.testList.sort((a, b) => a.createDate > b.createDate ? 1 : -1);
        break;
      // Rate (ASC)
      case this.sortOptions[3].value:
        // this.testList.sort((a, b) => a.createDate > b.createDate ? 1 : -1);
        break;
    }
  }

}
