import {Component, OnInit} from '@angular/core';
import {AppSettingsService} from "../../core/services/app-settings.service";

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

  constructor(public appSettings: AppSettingsService) {
  }

  ngOnInit() {
  }

  navigateTolink(link: string) {
    window.open(link, "_blank");
  }
}
