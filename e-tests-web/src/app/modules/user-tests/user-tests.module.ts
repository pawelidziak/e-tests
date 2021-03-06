import {NgModule} from '@angular/core';
import {userTestsRouting} from './user-tests.routing';
import {UserTestsComponent} from './components/user-tests.component';
import {SharedModule} from '@shared/shared.module';
import {TestsBoxesModule} from '@shared/components';
import {MatCardModule, MatTabsModule} from '@angular/material';

@NgModule({
  declarations: [
    UserTestsComponent
  ],
  imports: [
    SharedModule,
    userTestsRouting,

    TestsBoxesModule,
    MatCardModule,
    MatTabsModule
  ],
  exports: [],
  providers: []
})
export class UserTestsModule {
}
