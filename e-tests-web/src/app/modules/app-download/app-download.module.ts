import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {MatButtonModule, MatCardModule, MatIconModule, MatTabsModule} from '@angular/material';
import {AppDownloadComponent} from './components/app-download.component';
import {appDownloadRouting} from './app-download.routing';

@NgModule({
  declarations: [
    AppDownloadComponent
  ],
  imports: [
    SharedModule,
    appDownloadRouting,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],
  providers: []
})
export class AppDownloadModule {
}
