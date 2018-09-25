import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';

export interface ScrollPosition {
  position: SCROLL_POS_TYPE;
  offsetTop: number;
}

export enum SCROLL_POS_TYPE {
  IS_SCROLLING_DOWN,
  IS_SCROLLING_UP
}

@Injectable()
export class ScrollService {
  private readonly _scrollPosition: BehaviorSubject<ScrollPosition>;
  private _scrollPositionType: SCROLL_POS_TYPE;

  constructor() {
    const tmp: ScrollPosition = {
      position: null,
      offsetTop: 0
    };

    this._scrollPosition = new BehaviorSubject(tmp);
  }

  public get scrollPosition(): BehaviorSubject<ScrollPosition> {
    return this._scrollPosition;
  }

  public setScrollOffsetTop(value: number) {
    this._scrollPositionType = value > this._scrollPosition.value.offsetTop ?
      SCROLL_POS_TYPE.IS_SCROLLING_DOWN :
      SCROLL_POS_TYPE.IS_SCROLLING_UP;
    const scrollPos: ScrollPosition = {
      offsetTop: value,
      position: this._scrollPositionType
    };
    this._scrollPosition.next(scrollPos);
  }

}
