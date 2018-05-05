import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private SMALL_DEVICES = 1279;
  public hideDrawer = false;
  public isSmallDevice = false;

  constructor() {
    if (window.innerWidth < this.SMALL_DEVICES) {
      this.hideDrawer = true;
      this.isSmallDevice = true;
    }
  }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.hideDrawer = event.target.innerWidth <= this.SMALL_DEVICES;
    this.isSmallDevice = event.target.innerWidth <= this.SMALL_DEVICES;
  }
}
