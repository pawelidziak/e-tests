import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TestModel} from '../../core/models/Test';
import {ALL_ROUTES} from '../../shared/ROUTES';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AppSettingsService} from '../../core/services/app-settings.service';
import {RWDService} from '../../core/services/RWD.service';
import {expandPanelAnimation} from '../../shared/animations';

@Component({
  selector: 'app-tests-table',
  templateUrl: './tests-table.component.html',
  styleUrls: ['./tests-table.component.scss'],
  animations: [expandPanelAnimation()]
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
      this.displayedColumns = ['rate', 'name'];
    } else {
      this.displayedColumns = ['createDate', 'name', 'rate'];
    }
  }

  public navigateToTest(testId: string): void {
    this.router.navigate([`${ALL_ROUTES.CREATED_TEST}/${testId}`]);
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
