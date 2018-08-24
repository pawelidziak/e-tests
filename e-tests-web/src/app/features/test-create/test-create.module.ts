import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {testCreateRouting} from './test-create.routing';
import {TestCreateComponent} from './test-create.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatTooltipModule
} from '@angular/material';

@NgModule({
  declarations: [
    TestCreateComponent
  ],
  imports: [
    SharedModule,
    testCreateRouting,

    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatChipsModule
  ],
  exports: [],
  providers: []
})
export class TestCreateModule {
}
