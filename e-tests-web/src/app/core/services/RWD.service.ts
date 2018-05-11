import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';


@Injectable()
export class RWDService {
  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe(
      Breakpoints.XSmall
    ).subscribe(res => this._isXSmallScreen.next(res.matches));

    breakpointObserver.observe(
      [Breakpoints.XSmall, Breakpoints.Small]
    ).subscribe(res => this._isSmallScreen.next(res.matches));

    breakpointObserver.observe(
      [Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium]
    ).subscribe(res => this._isMediumScreen.next(res.matches));

    breakpointObserver.observe(
      [Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large]
    ).subscribe(res => this._isLargeScreen.next(res.matches));

    breakpointObserver.observe(
      [Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]
    ).subscribe(res => this._isXLargeScreen.next(res.matches));
  }

  private _isXSmallScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  get isXSmallScreen(): BehaviorSubject<boolean> {
    return this._isXSmallScreen;
  }

  private _isSmallScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  get isSmallScreen(): BehaviorSubject<boolean> {
    return this._isSmallScreen;
  }

  private _isMediumScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  get isMediumScreen(): BehaviorSubject<boolean> {
    return this._isMediumScreen;
  }

  private _isLargeScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  get isLargeScreen(): BehaviorSubject<boolean> {
    return this._isLargeScreen;
  }

  private _isXLargeScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  get isXLargeScreen(): BehaviorSubject<boolean> {
    return this._isXLargeScreen;
  }


}
