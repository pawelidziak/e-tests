import {Component, OnInit} from '@angular/core';
import {RWDService} from '../../core/services/RWD.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public isSmallScreen = false;

  constructor(private rwdService: RWDService) {
    this.rwdService.isSmallScreen.subscribe(res => {
      this.isSmallScreen = res;
    });

  }

  ngOnInit() {
  }

}
