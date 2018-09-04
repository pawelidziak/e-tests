import {NgModule} from '@angular/core';
import {MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {SharedModule} from '../../shared.module';
import {TestTagsComponent} from './test-tags.component';

@NgModule({
  declarations: [TestTagsComponent],
  imports: [
    SharedModule,

    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule
  ],
  exports: [TestTagsComponent],
  providers: []
})
export class TestTagsModule {
}
