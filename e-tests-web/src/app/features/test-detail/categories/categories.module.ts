import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {CategoriesComponent} from './categories.component';
import {
  MatAutocompleteModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    SharedModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule
  ],
  exports: [
    CategoriesComponent
  ],
  providers: []
})
export class CategoriesModule {
}
