import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';

export interface HeaderValues {
  breadcrumb: string[];
  appHeaderVisibility: boolean;
  pageHeaderVisibility: boolean;
}

@Injectable()
export class HeaderService {
  private _breadcrumb: string[] = [];
  private _appHeaderVisibility = true;
  private _pageHeaderVisibility = true;

  private _headerValues: BehaviorSubject<HeaderValues> = new BehaviorSubject({
    breadcrumb: this._breadcrumb,
    appHeaderVisibility: this._appHeaderVisibility,
    pageHeaderVisibility: this._pageHeaderVisibility
  });

  constructor() {
  }

  public setCurrentRoute(breadcrumb: string[]): void {
    this._headerValues.next({
      breadcrumb: breadcrumb,
      appHeaderVisibility: this._appHeaderVisibility,
      pageHeaderVisibility: this._pageHeaderVisibility,
    });
  }

  public getHeaderValues(): BehaviorSubject<HeaderValues> {
    return this._headerValues;
  }

  /**
      PAGE HEADER VISIBILITY
   */
  public hidePageHeader(): void {
    this._headerValues.next({
      breadcrumb: this._breadcrumb,
      appHeaderVisibility: this._appHeaderVisibility,
      pageHeaderVisibility: false
    });
  }

  public showPageHeader(): void {
    this._headerValues.next({
      breadcrumb: this._breadcrumb,
      appHeaderVisibility: this._appHeaderVisibility,
      pageHeaderVisibility: true
    });
  }

  /**
      APP HEADER VISIBILITY
   */
  public hideAppHeader(): void {
    this._headerValues.next({
      breadcrumb: this._breadcrumb,
      appHeaderVisibility: false,
      pageHeaderVisibility: this._pageHeaderVisibility
    });
  }

  public showAppeHeader(): void {
    this._headerValues.next({
      breadcrumb: this._breadcrumb,
      appHeaderVisibility: true,
      pageHeaderVisibility: this._pageHeaderVisibility
    });
  }

  /**
      APP AND PAGE HEADER VISIBILITY
   */
  public hideAppAndPageHeader(): void {
    this._headerValues.next({
      breadcrumb: this._breadcrumb,
      appHeaderVisibility: false,
      pageHeaderVisibility: false
    });
  }

  public showAppAndPageHeader(): void {
    this._headerValues.next({
      breadcrumb: this._breadcrumb,
      appHeaderVisibility: true,
      pageHeaderVisibility: true
    });
  }
}
