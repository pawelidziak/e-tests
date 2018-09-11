import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';


@Injectable()
export class ScrollService {
  private _scrollPosition: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
  }

  get scrollPosition(): BehaviorSubject<number> {
    return this._scrollPosition;
  }

  setScrollPosition(value: number) {
    this._scrollPosition.next(value);
  }
}
