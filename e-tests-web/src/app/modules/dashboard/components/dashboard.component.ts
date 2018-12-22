import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService, AppSettingsService} from '@core/services';
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

  constructor(private headerService: HeaderService,
              public appSettings: AppSettingsService) {
  }

  ngOnInit() {
    this.headerService.setCurrentRoute([]);
    this.createCubes();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
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
          {
            transform: `rotate3d(${this.getRandomInt(0, 10)}, ${this.getRandomInt(0, 10)}, ${this.getRandomInt(0, 10)}, ${this.getRandomInt(0, 360)}deg)`
          },
          {
            transform: `rotate3d(${this.getRandomInt(0, 10)}, ${this.getRandomInt(0, 10)}, ${this.getRandomInt(0, 10)}, ${this.getRandomInt(0, 360)}deg)`
          },
        ],
        {
          duration: this.getRandomInt(8000, 12000),
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
