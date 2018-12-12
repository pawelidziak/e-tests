import {Pipe, PipeTransform} from '@angular/core';
import {AppSettingsService} from '../../core/services/app-settings.service';

@Pipe({
  name: 'translate',
  pure: false
})

export class TranslatePipe implements PipeTransform {

  constructor(private appSettings: AppSettingsService) {
  }

  transform(value: string, args: any[]): any {
    if (!value) {
      return;
    }
    return this.appSettings.translateText(value);
  }
}
