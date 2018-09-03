import {NgModule} from '@angular/core';
import {SearchExercisePipe} from './search-exercise.pipe';
import {CharLimitPipe} from './char-limit.pipe';
import {SearchTestPipe} from './search-test.pipe';

@NgModule({
  declarations: [
    SearchExercisePipe,
    CharLimitPipe,
    SearchTestPipe
  ],
  exports: [
    SearchExercisePipe,
    CharLimitPipe,
    SearchTestPipe
  ]
})
export class MyPipesModule {
}
