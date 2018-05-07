import {Component, OnInit} from '@angular/core';
import {TestListService} from '../../core/services/TestListService';
import {Test} from '../../core/models/Test';
import {MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.scss']
})
export class TestsListComponent implements OnInit {

  public dataSource: MatTableDataSource<Test>;
  private source$: Subscription;

  constructor(private testListService: TestListService) {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.getTestsList();
  }

  private getTestsList() {
    this.source$ = this.testListService.getAllTests().subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res);
      },
      error => console.log(error)
    );
  }

}
