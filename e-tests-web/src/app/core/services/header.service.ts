import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';

export enum HeaderButtonType {
  HOME,
  MENU,
  BACK
}

@Injectable()
export class HeaderService {
  private _headerText: BehaviorSubject<string> = new BehaviorSubject('');
  private _headerButton: BehaviorSubject<HeaderButtonType> = new BehaviorSubject(null);
  private _headerVisibility: BehaviorSubject<boolean> = new BehaviorSubject(true);

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

  public setHeaderText(text: string): void {
    this._headerText.next(text);
  }

  /**
   HEADER VISIBILITY
   */
  public getHeaderVisibilityValue(): BehaviorSubject<boolean> {
    return this._headerVisibility;
  }

  public hideHeader(): void {
    this._headerVisibility.next(false);
  }

  public showHeader(): void {
    this._headerVisibility.next(true);
  }
}
