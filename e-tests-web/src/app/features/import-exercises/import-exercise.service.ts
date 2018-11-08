import {Injectable} from '@angular/core';
import {Exercise} from "../../core/models/Exercise";

@Injectable()
export class ImportExerciseService {


  constructor() {
  }


  public detectExercise(result: any): Exercise {
    const newLinesIndexTab = this.getNewLinesIndexTab(result);
    const correctAnswers = this.getCorrectAnswers(result, newLinesIndexTab);
    const question = result.substring(newLinesIndexTab[0] + 1, newLinesIndexTab[1]);
    const answers = this.getAnswers(result, newLinesIndexTab);

    return {
      question: question,
      answers: answers,
      correctAnswers: correctAnswers,
      createDate: new Date().getTime()
    };
  }

  private getNewLinesIndexTab(result: any): any[] {
    const tab = result.split('');
    const newLinesIndexTab: number[] = [];
    for (let i = 0; i < tab.length; i++) {
      if (tab[i].charCodeAt(0) === 10) {
        newLinesIndexTab.push(i);
      }
    }
    return newLinesIndexTab;
  }

  private getCorrectAnswers(result: any, newLinesIndexTab: any[]): any[] {
    const correctAnswersString = result.substring(0, newLinesIndexTab[0]);
    const correctAnswersSplit = correctAnswersString.split('');
    correctAnswersSplit.shift();
    const correctAnswers = [];
    for (let x = 0; x < correctAnswersSplit.length; x++) {
      if (correctAnswersSplit[x] === '1') {
        correctAnswers.push(x);
      }
    }
    return correctAnswers;
  }

  private getAnswers(result: any, newLinesIndexTab: any[]) {
    const answers = [];
    for (let j = 1; j < newLinesIndexTab.length; j++) {
      answers.push(result.substring(newLinesIndexTab[j] + 1, newLinesIndexTab[j + 1]))
    }
    return answers;
  }


  public fixExercise(exercise: Exercise) {
    if (exercise.question === '') {
      exercise.question = 'Empty question...';
    }
    for (let i = 0; i < exercise.answers.length; i++) {
      if (exercise.answers[0] === '') {
        exercise.answers[0] = 'Empty answer A ...';
      }
      if (exercise.answers[1] === '') {
        exercise.answers[1] = 'Empty answer B ...';
      }
      if (i > 1 && exercise.answers[i] === '') {
        exercise.answers.splice(i, 1);
        i--;
      }
    }
  }
}
