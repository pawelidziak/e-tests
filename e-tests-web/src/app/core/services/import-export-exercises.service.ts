import {Injectable} from '@angular/core';
import {Exercise} from "../models/Exercise";

export interface SelectParser {
  label: string;
  value: string;
  validFileType: string;
}

export const PARSERS: SelectParser[] = [
  {label: 'E-testo', value: 'etesto', validFileType: '.e-testo'},
  {label: 'PWR', value: 'pwr', validFileType: '.txt'}
];

@Injectable()
export class ImportExportExercisesService {

  constructor() {
  }

  /**
   *  Detect exercises depending on the selectedDisplay parser
   */
  public detectEtestoExercises(result: any): Exercise[] {
    const list = JSON.parse(this.b64DecodeUnicode(result));
    for (let i = 0; i < list.length; i++) {
      list[i].createDate = new Date().getTime() + i;
    }
    return list;
  }

  public detectPWRExercise(result: any): Exercise {
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

  /**
   * Download file to local computer, with .e-testo extension, encoded base64
   * @param data
   * @param filename
   */
  public downloadFile(data: any, filename: string) {
    filename = `${filename}.e-testo`;
    const file = new Blob([this.b64EncodeUnicode(JSON.stringify(data))], {type: 'application/octet-stream'});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
      const a = document.createElement("a");
      const url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

  /**
   *  Base64 encoding/decoding with special characters
   *  https://stackoverflow.com/a/30106551/7986258
   */

  private b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16))
    }))
  }

  private b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''));
  }

  /**
   * Replace empty question and delete empty answers
   * @param exercise
   */
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

  /**
   * Below are the methods used for parsing PWR files to E-testo Exercise object
   * (getNewLinesIndexTab, getCorrectAnswers, getAnswers)
   */
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

}
