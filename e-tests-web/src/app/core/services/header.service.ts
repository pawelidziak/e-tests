import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

export interface HeaderValues {
  breadcrumb: Breadcrumb[];
  appHeaderVisibility: boolean;
  pageHeaderVisibility: boolean;
}

export interface Breadcrumb {
  label: string;
  path: string;
}

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private _breadcrumb: Breadcrumb[] = [];
  private _appHeaderVisibility = true;
  private _pageHeaderVisibility = true;
  private readonly HOME_BREADCRUMB: Breadcrumb = {label: 'dashboard-title', path: 'dashboard'};

  private _headerValues: BehaviorSubject<HeaderValues> = new BehaviorSubject({
    breadcrumb: this._breadcrumb,
    appHeaderVisibility: this._appHeaderVisibility,
    pageHeaderVisibility: this._pageHeaderVisibility
  });

  constructor() {
  }

  public setCurrentRoute(breadcrumb: Breadcrumb[]): void {
    breadcrumb.unshift(this.HOME_BREADCRUMB);
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
