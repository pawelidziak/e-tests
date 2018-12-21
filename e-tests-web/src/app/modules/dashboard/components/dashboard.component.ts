import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService, AppSettingsService, AuthService} from '@core/services';
import {ALL_ROUTES} from '@shared/routes';
import {CubeUtils} from '@shared/utils/cube.utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  public ALL_ROUTES = ALL_ROUTES;
  public isUserLoggedIn: boolean;

  constructor(private auth: AuthService,
              private headerService: HeaderService,
              public appSettings: AppSettingsService) {
  }

  ngOnInit() {
    this.getUser();
    this.headerService.setCurrentRoute([]);
    this.createCubes();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private getUser(): void {
    this.subscriptions.push(
      this.auth.currentUserObservable.subscribe(
        res => this.isUserLoggedIn = !!res,
        error => console.log(error)
      ));
  }

  public openAuthDialog(): void {
    this.auth.openAuthDialog(false);
  }

  private createCubes() {
    const cubes = [];
    const colors = [this.appSettings.currentTheme.primary, this.appSettings.currentTheme.accent, 'white'];

    for (let i = 0; i < 30; i++) {
      const outer = CubeUtils.createCubeContainer(Math.random());
      const shadow = CubeUtils.createCubeShadow();
      outer.appendChild(shadow);

      const cube = CubeUtils.createCube(colors[Math.floor(Math.random() * colors.length)]);
      outer.appendChild(cube);

      cubes.push(cube);
      document.getElementById('dashboardCube').append(outer);
    }
    this.addAnimationsToCubes(cubes);
  }

  private addAnimationsToCubes(cubes: any[]) {
    cubes.forEach((el) => {
      el.animate(
        [
          {transform: 'rotateX(0) rotateY(0) rotateZ(0)'},
          {
            transform: `rotateX(${this.getRandomInt(0, 100)}deg)
                       rotateY(${this.getRandomInt(0, 100)}deg)
                       rotateZ(${this.getRandomInt(0, 100)}deg)`
          }
        ],
        {
          duration: this.getRandomInt(8000, 10000),
          direction: 'alternate',
          fill: 'both',
          iterations: Infinity,
          easing: 'ease-in-out'
        }
      );
    });
  }

  public getRandomInt(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
