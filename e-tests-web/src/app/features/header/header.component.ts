import {Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {HeaderButtonType, HeaderService} from '../../core/services/header.service';
import {Location} from '@angular/common';
import {RWDService} from '../../core/services/RWD.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() drawer: MatSidenav;

  public isXSmallScreen: boolean;
  public isSmallScreen: boolean;

  public headerText: string;
  public headerButton: HeaderButtonType;
  public HeaderButtonType = HeaderButtonType;

  constructor(private rwdService: RWDService,
              private location: Location,
              private headerService: HeaderService) {
    rwdService.isXSmallScreen.subscribe(res => this.isXSmallScreen = res);
    rwdService.isSmallScreen.subscribe(res => this.isSmallScreen = res);
  }

  ngOnInit() {
    this.headerService.headerText.subscribe(res => this.headerText = res);
    this.headerService.headerButton.subscribe(res => this.headerButton = res);
  }

  backClicked() {
    this.location.back();
  }
}
