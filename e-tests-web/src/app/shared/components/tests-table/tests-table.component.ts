import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TestModel} from '@core/models';
import {ALL_ROUTES} from '@shared/routes';
import {AppSettingsService, RWDService} from '@core/services';
import {expandPanelAnimation, slideFromTop} from '../../animations';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-tests-table',
  templateUrl: './tests-table.component.html',
  styleUrls: ['./tests-table.component.scss'],
  animations: [expandPanelAnimation(), slideFromTop()]
})
export class TestsTableComponent implements OnInit, OnChanges, OnDestroy {
  private subscriptions: any[] = [];

  @Input() testList: Array<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource: MatTableDataSource<TestModel>;
  public displayedColumns: string[];
  public isSmallScreen: boolean;

  constructor(private router: Router,
              private rwdService: RWDService,
              public appSettings: AppSettingsService) {
  }

  ngOnInit() {
    this.getRwdValue();
    this.translateMatPaginator();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.testList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.subscribeToSort();
  }

  private subscribeToSort(): void {
    // when user start sorting, go back to first page
    this.subscriptions.push(
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0)
    );
  }

  private getRwdValue(): void {
    this.subscriptions.push(
      this.rwdService.isSmallScreen.subscribe(
        res => this.createDisplayedColumns(res)
      )
    );
  }

  private createDisplayedColumns(value: boolean): void {
    this.isSmallScreen = value;
    if (this.isSmallScreen) {
      // this.displayedColumns = ['rate', 'name'];
      this.displayedColumns = ['name'];
    } else {
      // this.displayedColumns = ['createDate', 'name', 'rate'];
      this.displayedColumns = ['createDate', 'name'];
    }
  }

  public navigateToTest(testId: string): void {
    this.router.navigate([`${ALL_ROUTES.CREATED_TEST}/${testId}`]);
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private translateMatPaginator(): void {
    this.paginator._intl.itemsPerPageLabel = this.appSettings.translateText('table-items-per-page');
    this.paginator._intl.nextPageLabel = this.appSettings.translateText('next-page-label');
    this.paginator._intl.previousPageLabel = this.appSettings.translateText('prev-page-label');
    this.paginator._intl.firstPageLabel = this.appSettings.translateText('first-page-label');
    this.paginator._intl.lastPageLabel = this.appSettings.translateText('last-page-label');
  }
}
