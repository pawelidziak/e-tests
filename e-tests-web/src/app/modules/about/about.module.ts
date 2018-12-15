import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {AboutComponent} from './components/about.component';
import {aboutRouting} from './about.routing';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    SharedModule,
    aboutRouting,

    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: []
})
export class AboutModule {
}
