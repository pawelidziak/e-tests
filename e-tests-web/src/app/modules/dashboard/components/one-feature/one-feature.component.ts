import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-one-feature',
  templateUrl: './one-feature.component.html',
  styleUrls: ['./one-feature.component.scss']
})
export class OneFeatureComponent implements OnInit {

  @Input() headerText: string;
  @Input() headerIcon: string;
  @Input() headerIconColor = 'accent';
  @Input() paragraph: string;
  @Input() ariaLabel: string;

  constructor() { }

  ngOnInit() {
  }

}
