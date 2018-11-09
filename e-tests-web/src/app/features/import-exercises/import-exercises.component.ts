import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppSettingsService} from "../../core/services/app-settings.service";
import {ImportExportExercisesService, PARSERS, SelectParser} from "../../core/services/import-export-exercises.service";
import {TestService} from "../../core/services/test.service";
import {ALL_ROUTES, ROUTE_PARAMS} from "../../shared/ROUTES";
import {ActivatedRoute, Router} from "@angular/router";
import {TestModel} from "../../core/models/Test";
import {HeaderService} from "../../core/services/header.service";
import {Exercise} from "../../core/models/Exercise";
import {TestExercisesService} from "../../core/services/test-exercises.service";


@Component({
  selector: 'app-import-exercises',
  templateUrl: './import-exercises.component.html',
  styleUrls: ['./import-exercises.component.scss']
})
export class ImportExercisesComponent implements OnInit, OnDestroy {
  private subscriptions: any = [];
  private testId: string;

  private selectedFiles = [];
  public importedExercises: Exercise[] = [];
  public filesOnLoad: boolean;

  public test: TestModel;
  public parserOption = PARSERS;
  public selectedParser: SelectParser = this.parserOption[0];
  public errorMsg: string;

  constructor(public appSettings: AppSettingsService,
              private route: ActivatedRoute,
              private router: Router,
              private headerService: HeaderService,
              private testService: TestService,
              private exerciseService: TestExercisesService,
              private importService: ImportExportExercisesService) {
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

  private getTest() {
    this.subscriptions.push(
      this.testService.getTestById(this.testId).subscribe(
        res => {
          this.test = res;
          this.headerService.setCurrentRoute([
            {label: 'Tests', path: ALL_ROUTES.USER_TESTS_LIST},
            {label: this.test.name, path: `${ALL_ROUTES.CREATED_TEST}/${this.testId}`},
            {label: 'Import', path: ''}
          ]);
        },
        error => console.log(error)
      )
    );
  }

  public getFiles(event: any) {
    this.errorMsg = '';
    if (event.target.files.length > 0) {
      if (this.filesIncorrect(event.target.files)) {
        this.errorMsg = 'Please select right file/s.';
        return;
      }
      this.importedExercises = [];
      this.selectedFiles = [].slice.call(event.target.files);
      this.uploadFiles()
    }
  }

  private uploadFiles() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const fileReader = new FileReader();
      this.filesOnLoad = true;
      fileReader.readAsText(this.selectedFiles[i], 'ISO-8859-1');
      fileReader.onload = () => {

        if (this.selectedParser.value === 'etesto') {
          this.importedExercises = this.importService.detectEtestoExercises(fileReader.result);
        }
        if (this.selectedParser.value === 'pwr') {
          this.importedExercises.push(this.importService.detectPWRExercise(fileReader.result));
        }
      };
      fileReader.onloadend = () => {
        if (i === this.selectedFiles.length - 1) {
          this.filesOnLoad = false
        }
      };
      fileReader.onerror = () => {
        this.errorMsg = 'Something went wrong.. Please, let us know on: email@email.com';
        this.filesOnLoad = false;
      }
    }
  }

  public saveExercises(): void {
    this.filesOnLoad = true;
    this.importedExercises.forEach(x => this.importService.fixExercise(x));
    this.exerciseService.addExerciseList(this.testId, this.importedExercises)
      .then(() => {
        this.filesOnLoad = false;
        this.navigateToTest();
      })
      .catch(error => {
        this.errorMsg = 'Something went wrong.. Please, let us know on: email@email.com';
        this.filesOnLoad = false;
      });
  }

  public resetExercises(): void {
    this.importedExercises = [];
    this.selectedFiles = [];
  }

  public changeParser(parser: SelectParser) {
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

  private navigateToTest() {
    this.router.navigate([`${ALL_ROUTES.CREATED_TEST}/${this.testId}`]);
  }
}
