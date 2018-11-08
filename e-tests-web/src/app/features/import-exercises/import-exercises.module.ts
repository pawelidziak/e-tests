import {NgModule} from '@angular/core';
import {ImportExercisesComponent} from "./import-exercises.component";
import {SharedModule} from "../../shared/shared.module";
import {
  MatButtonModule, MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatMenuModule, MatSelectModule,
} from "@angular/material";
import {DisplayOneExerciseModule} from "../display-exercises/display-one-exercise/display-one-exercise.module";
import {importExercisesRouting} from "./import-exercises.routing";
import {SpinnerModule} from "../../shared/components/spinner/spinner.module";
import {ImportExerciseService} from "./import-exercise.service";

@NgModule({
  declarations: [
    ImportExercisesComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    importExercisesRouting,
    SpinnerModule,
    DisplayOneExerciseModule,

    MatSelectModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  exports: [],
  providers: [ImportExerciseService]
})
export class ImportExercisesModule {
}
