import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ROUTE_PARAMS, ALL_ROUTES} from '../../../shared/routes/index';
import {TestModel, Exercise} from '@core/models';
import {TestService, AppSettingsService, AuthService, HeaderService, LoaderService} from '@core/services';
import {ExerciseUtils} from '@shared/utils';

export interface SelectParser {
  label: string;
  value: string;
  validFileType: string;
}

export const PARSERS: SelectParser[] = [
  {label: 'E-testo', value: 'etesto', validFileType: '.e-testo'},
  {label: 'TXT', value: 'txt', validFileType: '.txt'}
];

@Component({
  selector: 'app-import-exercises',
  templateUrl: './import-exercises.component.html',
  styleUrls: ['./import-exercises.component.scss']
})
export class ImportExercisesComponent implements OnInit, OnDestroy {
  private subscriptions: any = [];
  public testId: string;

  private selectedFiles = [];
  public importedExercises: Exercise[] = [];
  public filesOnLoad: boolean;

  public test: TestModel;
  public parserOption = PARSERS;
  public selectedParser: SelectParser = this.parserOption[0];
  public errorMsg: string;
  public isHovering: boolean;

  constructor(public appSettings: AppSettingsService,
              private loader: LoaderService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router,
              private headerService: HeaderService,
              private testService: TestService) {
    this.subscriptions.push(
      this.route.parent.params.subscribe(params => {
        this.testId = params[ROUTE_PARAMS.TEST_ID];
        this.getTest();
      })
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private getTest(): void {
    this.loader.start();
    this.subscriptions.push(
      this.testService.getTestById(this.testId).subscribe(
        res => {
          if (this.checkIfIsAuthor(res.authorId)) {
            this.test = res;
            this.headerService.setCurrentRoute([
              {label: 'tests-title', path: ALL_ROUTES.USER_TESTS_LIST},
              {label: this.test.name, path: `${ALL_ROUTES.CREATED_TEST}/${this.testId}`},
              {label: 'Import', path: ''}
            ]);
          } else {
            this.router.navigate([ALL_ROUTES.DASHBOARD]);
          }
          this.loader.complete();
        },
        error => console.log(error)
      )
    );
  }

  public handleExerciseUpdated(exercise: Exercise): void {
    const index = this.importedExercises.findIndex(x => x.createDate === exercise.createDate);
    this.importedExercises[index] = exercise;
  }

  public handleExerciseDeleted(id: number): void {
    const index = this.importedExercises.findIndex(x => x.createDate === id);
    this.importedExercises.splice(index, 1);
  }

  public getFiles(event: any): void {
    this.errorMsg = '';
    if (event.length > 0 && event.length <= 100) {
      if (this.filesIncorrect(event)) {
        this.errorMsg = 'Please select right file/s.';
        return;
      }
      this.importedExercises = [];
      this.selectedFiles = [].slice.call(event);
      this.uploadFiles();
    } else {
      this.errorMsg = 'The maximum number of files is 100';
    }
  }

  private uploadFiles(): void {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const fileReader = new FileReader();
      this.filesOnLoad = true;
      fileReader.readAsText(this.selectedFiles[i], 'ISO-8859-1');
      fileReader.onload = () => {

        // e-testo
        if (this.selectedParser.value === this.parserOption[0].value) {
          this.importedExercises = ExerciseUtils.detectEtestoExercises(fileReader.result);
        }

        // txt
        if (this.selectedParser.value === this.parserOption[1].value) {
          this.importedExercises.push(ExerciseUtils.detectPWRExercise(fileReader.result));
        }
      };
      fileReader.onloadend = () => {
        if (i === this.selectedFiles.length - 1) {
          this.filesOnLoad = false;
        }
      };
      fileReader.onerror = () => {
        this.errorMsg = 'Something went wrong.. Please, let us know on: email@email.com';
        this.filesOnLoad = false;
      };
    }
  }

  public saveExercises(): void {
    this.filesOnLoad = true;
    this.importedExercises.forEach(x => this.testService.fixExercise(x));
    this.testService.saveExercises(this.testId, this.importedExercises)
      .then(() => {
        this.filesOnLoad = false;
        this.navigateToTest();
      })
      .catch(() => {
        this.errorMsg = 'Something went wrong.. Please, let us know on: email@email.com';
        this.filesOnLoad = false;
      });
  }

  public resetExercises(): void {
    this.importedExercises = [];
    this.selectedFiles = [];
  }

  public changeParser(parser: SelectParser): void {
    this.selectedParser = parser;
  }

  private filesIncorrect(files: any[]): boolean {
    for (const file of files) {
      if (file.name.substr(file.name.length - this.selectedParser.validFileType.length) !== this.selectedParser.validFileType) {
        return true;
      }
    }
    return false;
  }

  private navigateToTest(): void {
    this.router.navigate([`${ALL_ROUTES.CREATED_TEST}/${this.testId}`]);
  }

  private checkIfIsAuthor(authorId: string): boolean {
    return this.auth.currentUserId === authorId;
  }

  public toggleHover(event: boolean): void {
    this.isHovering = event;
  }
}
