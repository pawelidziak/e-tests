import {Component, HostListener, Input, OnInit} from '@angular/core';
import {TestModel} from '../../../core/models/Test';

@Component({
  selector: 'app-box-list',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box-list.component.scss']
})
export class BoxListComponent implements OnInit {

  @Input() testList: TestModel[];
  selected = 'TEST'
  private readonly NAME_FONT_SIZE = 12;
  nameLimit: number;
  tagsLimit: number;

  constructor() {
  }

  ngOnInit() {
    this.calculateLimits(window.innerWidth);
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateLimits(event.target.innerWidth);
  }

  private calculateLimits(innerWidth: number): void {

    // SMALL
    if (innerWidth < 576) {
      this.nameLimit = Math.floor((window.innerWidth) / this.NAME_FONT_SIZE );
    }
    if (innerWidth >= 576) {
      this.nameLimit = 50;
    }
    if (innerWidth >= 768) {
      this.nameLimit = 29;
    }
    if (innerWidth >= 992) {
      this.nameLimit = 17;
      this.tagsLimit = 26;
    }
    if (innerWidth >= 1200) {
      this.nameLimit = 20;
      this.tagsLimit = 36;
    }

  }

}
