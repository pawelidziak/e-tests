import {NgModule} from '@angular/core';
import {UserProfileComponent} from './user-profile.component';
import {SharedModule} from '../../shared/shared.module';
import {userProfileRouting} from './user-profile.routing';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    SharedModule,
    userProfileRouting,

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
