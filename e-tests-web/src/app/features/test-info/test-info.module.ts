import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {TestInfoComponent} from './test-info.component';
import {testInfoRouting} from './test-info.routing';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatTableModule
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  declarations: [
    TestInfoComponent
  ],
  imports: [
    SharedModule,
    testInfoRouting,


    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    CdkTableModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule,
    MatExpansionModule
  ],
  exports: [],
  providers: []
})
export class TestInfoModule {
}
