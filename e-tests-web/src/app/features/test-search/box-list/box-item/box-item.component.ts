import {Component, HostListener, Input, OnInit} from '@angular/core';
import {AppSettingsService} from '../../../../core/services/app-settings.service';

@Component({
  selector: 'app-box-item',
  templateUrl: './box-item.component.html',
  styleUrls: ['./box-item.component.scss']
})
export class BoxItemComponent implements OnInit {

  @Input() item: any;
  private readonly MAX_TAGS_LENGTH = 30;

  public maxTags = 10;

  constructor(public appSettings: AppSettingsService) {
  }

  ngOnInit() {
  }

  private calculateTagsLimit(): void {
    let charLength = 0;
    for (const tag of this.item.tags) {
      charLength += tag.length + 3;     // + 3 because separator ' | '
      if (charLength < this.MAX_TAGS_LENGTH) {
        this.maxTags++;
      } else {
        return;
      }
    }
  }
}
