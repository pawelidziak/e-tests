import {NgModule} from '@angular/core';
import {DisplayOneExerciseComponent} from "./display-one-exercise.component";
import {SharedModule} from "../../../shared/shared.module";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatSnackBarModule,
  MatTooltipModule
} from "@angular/material";
import {DirectivesModule} from "../../../shared/directives/directives.module";


@NgModule({
  declarations: [
    DisplayOneExerciseComponent
  ],
  imports: [
    SharedModule,

    DirectivesModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  exports: [DisplayOneExerciseComponent],
  providers: []
})
export class DisplayOneExerciseModule {
}
