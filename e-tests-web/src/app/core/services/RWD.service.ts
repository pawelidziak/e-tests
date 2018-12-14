import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';


@Injectable()
export class RWDService {
  private _isXSmallScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  private _isSmallScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  private _isMediumScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  private _isLargeScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  private _isXLargeScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe(
      Breakpoints.XSmall
    ).subscribe(res => this._isXSmallScreen.next(res.matches));

    breakpointObserver.observe(
      [Breakpoints.XSmall, Breakpoints.Small]
    ).subscribe(res => this._isSmallScreen.next(res.matches));

    breakpointObserver.observe(
      [Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Handset]
    ).subscribe(res => this._isMediumScreen.next(res.matches));

    breakpointObserver.observe(
      [Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large]
    ).subscribe(res => this._isLargeScreen.next(res.matches));

    breakpointObserver.observe(
      [Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]
    ).subscribe(res => this._isXLargeScreen.next(res.matches));
  }

  get isXSmallScreen(): BehaviorSubject<boolean> {
    return this._isXSmallScreen;
  }

  get isSmallScreen(): BehaviorSubject<boolean> {
    return this._isSmallScreen;
  }

  get isMediumScreen(): BehaviorSubject<boolean> {
    return this._isMediumScreen;
  }

  get isLargeScreen(): BehaviorSubject<boolean> {
    return this._isLargeScreen;
  }

  get isXLargeScreen(): BehaviorSubject<boolean> {
    return this._isXLargeScreen;
  }

}
