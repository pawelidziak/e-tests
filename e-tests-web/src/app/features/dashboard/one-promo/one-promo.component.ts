import {Component, Input, OnInit} from '@angular/core';
import {AppSettingsService} from '../../../core/services/app-settings.service';

@Component({
  selector: 'app-one-promo',
  templateUrl: './one-promo.component.html',
  styleUrls: ['./one-promo.component.scss']
})
export class OnePromoComponent implements OnInit {

  @Input() headerText: string;
  @Input() headerIcon: string;
  @Input() headerIconColor = 'accent';
  @Input() isBigIcon = false;
  @Input() paragraph: string;
  @Input() imgUrl: string;
  @Input() alt: string;

  constructor(public appSettings: AppSettingsService) { }

  ngOnInit() {
  }

}
