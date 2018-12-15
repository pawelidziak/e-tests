import {Exercise} from '@core/models';
import {CLOSE_DIALOG_OPERATION} from './close-dialog-operation';

export interface ExerciseDialogClose {
  exercise?: Exercise;
  exerciseId?: number;
  operation: CLOSE_DIALOG_OPERATION;
}
