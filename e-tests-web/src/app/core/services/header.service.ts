import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';

export enum HeaderButtonType {
  HOME,
  BACK
}

@Injectable()
export class HeaderService {
  private _headerText: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _headerButton: BehaviorSubject<HeaderButtonType> = new BehaviorSubject<HeaderButtonType>(null);

  constructor() {
  }

  public getHeaderTextValue(): BehaviorSubject<string> {
    return this._headerText;
  }

  public getHeaderButtonValue(): BehaviorSubject<HeaderButtonType> {
    return this._headerButton;
  }

  public setHeaderButtonAndText(button: HeaderButtonType, text: string): void {
    this._headerButton.next(button);
    this._headerText.next(text);
  }
}
