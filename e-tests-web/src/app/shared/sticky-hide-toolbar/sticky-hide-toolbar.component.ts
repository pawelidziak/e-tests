import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SCROLL_POS_TYPE, ScrollPosition, ScrollService} from '../../core/services/scroll.service';
import {slideFromTopAnimation} from '../animations';

@Component({
  selector: 'app-sticky-hide-toolbar',
  templateUrl: './sticky-hide-toolbar.component.html',
  styleUrls: ['./sticky-hide-toolbar.component.scss'],
  animations: [slideFromTopAnimation()]
})
export class StickyHideToolbarComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];

  @Input() height = 56;
  @Input() color = 'primary';
  @Input() stickyTop: boolean;
  @Input() stickyBottom: boolean;
  @Input() boxShadow = false;

  private HEADER_HEIGHT = this.height + 50; // + offset

  public showToolbar = true;


  constructor(private scrollService: ScrollService) {
  }


  ngOnInit() {
    this.checkScrollPos();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private checkScrollPos(): void {
    this.subscriptions.push(
      this.scrollService.scrollPosition.subscribe(
        (res: ScrollPosition) => {
          if (res.offsetTop > this.HEADER_HEIGHT) {
            if (res.position === SCROLL_POS_TYPE.IS_SCROLLING_UP) {
              this.showToolbar = true;
            }
            if (res.position === SCROLL_POS_TYPE.IS_SCROLLING_DOWN) {
              this.showToolbar = false;
            }
          } else {
            this.showToolbar = true;
          }
        }
      )
    );
  }
}
