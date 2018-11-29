import {Component, OnInit} from '@angular/core';
import {AppSettingsService} from '../../core/services/app-settings.service';
import {HeaderService} from '../../core/services/header.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  usedTechs: any = [
    {label: 'Angular 7', link: 'https://angular.io/'},
    {label: 'Angular Material', link: 'https://material.angular.io/'},
    {label: 'Material icons', link: 'https://material.io/tools/icons/'},
    {label: 'Firebase', link: 'https://firebase.google.com/'},
    {label: 'Angularfire2', link: 'https://github.com/angular/angularfire2/'},
  ];

  constructor(private headerService: HeaderService,
              public appSettings: AppSettingsService) {
  }

  ngOnInit() {
    this.headerService.setCurrentRoute([
      {label: 'about-title', path: ''}
    ]);
  }

  public navigateTolink(link: string): void {
    window.open(link, '_blank');
  }
}
