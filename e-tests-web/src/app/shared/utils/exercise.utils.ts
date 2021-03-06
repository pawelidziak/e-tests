import {Exercise} from '@core/models';
import {Base64Utils} from '@shared/utils/base64.utils';

/**
 *  Here are utils methods for exercise operations
 */
export class ExerciseUtils {

  public static detectEtestoExercises(result: any): Exercise[] {
    const list = JSON.parse(Base64Utils.b64DecodeUnicode(result));
    for (let i = 0; i < list.length; i++) {
      list[i].createDate = new Date().getTime() + i;
    }
    return list;
  }

  public static detectPWRExercise(result: any): Exercise {
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
   * Below are the methods used for parsing PWR files to eTesto Exercise object
   * (getNewLinesIndexTab, getCorrectAnswers, getAnswers)
   */
  private static getNewLinesIndexTab(result: any): any[] {
    const tab = result.split('');
    const newLinesIndexTab: number[] = [];
    for (let i = 0; i < tab.length; i++) {
      if (tab[i].charCodeAt(0) === 10) {
        newLinesIndexTab.push(i);
      }
    }
    return newLinesIndexTab;
  }

  private static getCorrectAnswers(result: any, newLinesIndexTab: any[]): any[] {
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

  private static getAnswers(result: any, newLinesIndexTab: any[]) {
    const answers = [];
    for (let j = 1; j < newLinesIndexTab.length; j++) {
      answers.push(result.substring(newLinesIndexTab[j] + 1, newLinesIndexTab[j + 1]));
    }
    return answers;
  }

  /**
   * Download file to local computer, with .eTesto extension, encoded base64
   * @param data
   * @param filename
   */
  public static downloadExercisesAsFile(data: any, filename: string) {
    filename = `${filename}.eTesto`;
    const file = new Blob([Base64Utils.b64EncodeUnicode(JSON.stringify(data))], {type: 'application/octet-stream'});
    if (window.navigator.msSaveOrOpenBlob) {// IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    } else { // Others
      const a: any = document.createElement('a');
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
}
