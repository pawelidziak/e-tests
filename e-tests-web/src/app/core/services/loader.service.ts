import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

@Injectable()
export class LoaderService {

  constructor() {
  }

  private _status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
