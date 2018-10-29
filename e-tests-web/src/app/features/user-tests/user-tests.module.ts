import {NgModule} from '@angular/core';
import {userTestsRouting} from './user-tests.routing';
import {UserTestsComponent} from './user-tests.component';
import {SharedModule} from '../../shared/shared.module';
import {TestsBoxesModule} from '../../shared/components/tests-boxes/tests-boxes.module';

@NgModule({
  declarations: [
    UserTestsComponent
  ],
  imports: [
    SharedModule,
    userTestsRouting,

    TestsBoxesModule
  ],
  exports: [],
  providers: []
})
export class UserTestsModule {
}
