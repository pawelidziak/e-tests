import {Component, OnInit} from '@angular/core';
import {RWDservice} from '../../core/services/RWDservice';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public isSmallScreen = false;

  constructor(private rwdService: RWDservice) {
    this.rwdService.isSmallScreen.subscribe(res => {
      this.isSmallScreen = res;
    });

  }

  ngOnInit() {
  }

}
