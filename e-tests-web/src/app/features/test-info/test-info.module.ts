import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {TestInfoComponent} from './test-info.component';
import {testInfoRouting} from './test-info.routing';
import {MatButtonModule, MatIconModule,} from '@angular/material';

@NgModule({
  declarations: [
    TestInfoComponent
  ],
  imports: [
    SharedModule,
    testInfoRouting,

    MatButtonModule,
    MatIconModule
  ],
  exports: [],
  providers: []
})
export class TestInfoModule {
}
