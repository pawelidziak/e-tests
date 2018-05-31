import {Component, Input, OnInit} from '@angular/core';
import {HeaderButtonType, HeaderService} from '../../../core/services/header.service';
import {Location} from '@angular/common';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() drawer: MatSidenav;
  @Input() isSmallScreen: boolean;

  public headerButton: HeaderButtonType;
  public headerText: string;
  public HeaderButtonType = HeaderButtonType;

  constructor(private headerService: HeaderService,
              private location: Location) {
  }

  ngOnInit() {
    this.getHeaderButton();
    this.getHeaderText();
  }

  public backClicked(): void {
    this.location.back();
  }

  private getHeaderButton(): void {
    const buttonSub$ = this.headerService.getHeaderButtonValue().subscribe(
      res => {
        this.headerButton = res;
      }
    );
  }

  private getHeaderText(): void {
    const textSub$ = this.headerService.getHeaderTextValue().subscribe(
      res => {
        this.headerText = res;
      }
    );
  }

}
