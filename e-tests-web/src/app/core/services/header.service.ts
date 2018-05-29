import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';

export enum HeaderButtonType {
  HOME,
  BACK
}

@Injectable()
export class HeaderService {
  constructor() {
  }

  private _headerText: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get headerText(): BehaviorSubject<string> {
    return this._headerText;
  }

  set headerText(value: BehaviorSubject<string>) {
    this._headerText = value;
  }

  private _headerButton: BehaviorSubject<HeaderButtonType> = new BehaviorSubject<HeaderButtonType>(null);

  get headerButton(): BehaviorSubject<HeaderButtonType> {
    return this._headerButton;
  }

  set headerButton(value: BehaviorSubject<HeaderButtonType>) {
    this._headerButton = value;
  }

  public setHomeButtonAndText(): void {
    this.setHomeButton();
    this.setHeaderText('E-Testo');
  }

  public setHeaderText(text: string): void {
    this.headerText.next(text);
  }

  public setHomeButton(): void {
    this.headerButton.next(HeaderButtonType.HOME);
  }

  public setBackButton(): void {
    this.headerButton.next(HeaderButtonType.BACK);
  }


}
