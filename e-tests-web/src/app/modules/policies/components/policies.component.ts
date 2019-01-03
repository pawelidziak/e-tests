import {Component, OnInit} from '@angular/core';
import {ALL_ROUTES} from '@shared/routes';
import {HeaderService} from '@core/services';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {


  constructor(private headerService: HeaderService) {
  }

  ngOnInit() {
    this.headerService.setCurrentRoute([
      {label: 'policies-title', path: ''},
    ]);
  }

}
