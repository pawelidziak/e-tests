import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TestModel} from '../../core/models/Test';
import {ALL_ROUTES} from '../../shared/ROUTES';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PagerService} from '../../core/services/pager.service';
import {AppSettingsService} from '../../core/services/app-settings.service';
import {RWDService} from '../../core/services/RWD.service';

interface SortOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms ease-in-out')),
      transition('expanded <=> void', animate('225ms ease-in-out'))
    ])
  ]
})
export class TestsListComponent implements OnInit, OnChanges {

  @Input() testList: Array<any>;
  public searchText: string;

  public nowaLista: any[];

  public rangeFrom = 0;
  public rangeStep = 3;
  public rangeTo = this.rangeStep;


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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<TestModel>;

  displayedColumns: string[] = ['rate', 'name', 'date', 'author', 'actions'];

  loading = true;


  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
   isSmallScreen: boolean;

  constructor(private router: Router,
              private rwdService: RWDService,
              public appSettings: AppSettingsService,
              private pagerService: PagerService) {
  }

  ngOnInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.rwdService.isSmallScreen.subscribe(
      res => {
        this.isSmallScreen = res;
        if(this.isSmallScreen){
          this.displayedColumns = ['rate', 'name'];
        } else {
          this.displayedColumns = ['rate', 'name', 'date', 'author'];
        }
      }
    )
  }

  public navigateToTest(testId: string): void {
    this.router.navigate([`${ALL_ROUTES.CREATED_TEST}/${testId}`]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.testList) {
      this.dataSource = new MatTableDataSource<TestModel>(this.testList);
      // this.setPage(1);
      // console.log(this.dataSource);
    }
    // // this.testList
    //
    // if (this.testList) {
    //   this.testList.forEach(test => test.expanded = false);
    //   console.log(this.testList);
    // }
    this.dataSource = new MatTableDataSource(this.testList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('change')
  }

  setPage(page: number) {
    // get current page of items
    this.pager = this.pagerService.getPager(this.dataSource.filteredData.length, page);
    this.pagedItems = this.dataSource.filteredData.slice(this.pager.startIndex, this.pager.endIndex + 1);

  }
  // get pager object from service

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
  }

  // filter(page: number) {
  //   if (this.searchText && this.searchText !== '') {
  //
  //     this.searchText = this.searchText.toLowerCase();
  //     this.pagedItems = this.testList.filter((test: TestModel) => {
  //       return test.name.toLowerCase().includes(this.searchText) ||
  //         test.desc.toLowerCase().includes(this.searchText) ||
  //         JSON.stringify(test.tags).toLowerCase().includes(this.searchText);
  //     }).slice(this.pager.startIndex, this.pager.endIndex + 1);
  //   } else {
  //
  //     this.pagedItems = this.testList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  //     console.log('else')
  //   }
  //
  //   this.pager = this.pagerService.getPager(this.pagedItems.length, page);
  //   console.log(this.pagedItems);
  //
  //
  // }
  public sortTestList(): void {
    switch (this.selectedSortOption.value) {
      // Date (DESC)
      case this.sortOptions[0].value:
        this.pagedItems.sort((a, b) => a.createDate > b.createDate ? -1 : 1);
        break;
      // Date (ASC)
      case this.sortOptions[1].value:
        this.pagedItems.sort((a, b) => a.createDate > b.createDate ? 1 : -1);
        break;
      // Rate (DESC)
      case this.sortOptions[2].value:
        // this.pagedItems.sort((a, b) => a.createDate > b.createDate ? 1 : -1);
        break;
      // Rate (ASC)
      case this.sortOptions[3].value:
        // this.pagedItems.sort((a, b) => a.createDate > b.createDate ? 1 : -1);
        break;
    }
  }
}
