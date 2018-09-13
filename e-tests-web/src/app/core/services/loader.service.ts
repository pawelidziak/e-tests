import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';

@Injectable()
export class LoaderService {

  private _status: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
  }

  get status(): BehaviorSubject<boolean> {
    return this._status;
  }

  start() {
    this.display(true);
  }

  complete() {
    this.display(false);
  }

  private display(value: boolean) {
    this._status.next(value);
  }

}
