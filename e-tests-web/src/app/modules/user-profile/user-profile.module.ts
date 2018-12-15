import {NgModule} from '@angular/core';
import {UserProfileComponent} from './components/user-profile.component';
import {SharedModule} from '@shared/shared.module';
import {userProfileRouting} from './user-profile.routing';
import {DirectivesModule} from '@shared/directives/directives.module';
import {SpinnerModule} from '@shared/components';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
} from '@angular/material';

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    SharedModule,
    userProfileRouting,
    DirectivesModule,
    SpinnerModule,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [],
  providers: []
})
export class UserProfileModule {
}
