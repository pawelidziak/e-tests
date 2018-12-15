import {NgModule} from '@angular/core';
import {TestsBoxesComponent} from './tests-boxes.component';
import {SharedModule} from '../../shared.module';
import {OneTestBoxComponent} from './one-test-box/one-test-box.component';
import {MyPipesModule} from '../../pipes/my-pipes.module';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatProgressBarModule
} from '@angular/material';

@NgModule({
  declarations: [
    TestsBoxesComponent,
    OneTestBoxComponent
  ],
  imports: [
    SharedModule,
    MyPipesModule,

    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    TestsBoxesComponent
  ],
  providers: []
})
export class TestsBoxesModule {
}
