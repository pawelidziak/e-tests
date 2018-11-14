import {NgModule} from '@angular/core';
import {userTestsRouting} from './user-tests.routing';
import {UserTestsComponent} from './user-tests.component';
import {SharedModule} from '../../shared/shared.module';
import {TestsBoxesModule} from '../../shared/components/tests-boxes/tests-boxes.module';
import {MatButtonModule, MatButtonToggleModule, MatCardModule, MatIconModule} from "@angular/material";

@NgModule({
  declarations: [
    UserTestsComponent
  ],
  imports: [
    SharedModule,
    userTestsRouting,

    TestsBoxesModule,
    MatButtonToggleModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [],
  providers: []
})
export class UserTestsModule {
}
