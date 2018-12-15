import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _isOnLoad: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
  }

  get isOnLoad(): BehaviorSubject<boolean> {
    return this._isOnLoad;
  }

  start() {
    this.setOnLoadValue(true);
  }

  complete() {
    this.setOnLoadValue(false);
  }

  private setOnLoadValue(value: boolean) {
    this._isOnLoad.next(value);
  }

}
