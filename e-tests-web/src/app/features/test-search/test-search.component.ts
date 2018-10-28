import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TestModel} from '../../core/models/Test';
import {HeaderService} from '../../core/services/header.service';
import {TestService} from '../../core/services/test.service';
import {LoaderService} from '../../core/services/loader.service';

@Component({
  selector: 'app-test-search',
  templateUrl: './test-search.component.html',
  styleUrls: ['./test-search.component.scss']
})
export class TestSearchComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];

  public testList: TestModel[];

  public recentlyAdded: TestModel[];

  constructor(private headerService: HeaderService,
              private router: Router,
              private testService: TestService,
              private loader: LoaderService) {
  }

  ngOnInit() {
    this.getTestsList();
    this.headerService.setCurrentRoute(['home', 'search']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private getTestsList(): void {
    // this.loader.start();
    this.subscriptions.push(
      this.testService.getTests().subscribe(
        res => {
          this.testList = res;
          this.testList.forEach(x => this.testList.push(x));
          this.getTestAuthor();
        },
        error => {
          console.log(error);
          this.loader.complete();
        }
      )
    );
  }

  private getTestAuthor() {

    for (const test of this.testList) {
      this.subscriptions.push(
        this.testService.getAuthor(test.authorId).subscribe(
          res => {
            test.authorObj = res;
            this.loader.complete();
          }, error => {
            console.log(error);
            this.loader.complete();
          }
        ));
    }
    // this.recentlyAdded = this.testList.splice(0, 3);
  }
}
