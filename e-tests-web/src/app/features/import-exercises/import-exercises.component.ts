import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppSettingsService} from "../../core/services/app-settings.service";
import {ImportExerciseService} from "./import-exercise.service";
import {TestService} from "../../core/services/test.service";
import {ROUTE_PARAMS} from "../../shared/ROUTES";
import {ActivatedRoute} from "@angular/router";
import {TestModel} from "../../core/models/Test";
import {HeaderService} from "../../core/services/header.service";

interface SelectParser {
  label: string;
  value: string;
}

@Component({
  selector: 'app-import-exercises',
  templateUrl: './import-exercises.component.html',
  styleUrls: ['./import-exercises.component.scss']
})
export class ImportExercisesComponent implements OnInit, OnDestroy {
  private subscriptions: any = [];
  private testId: string;
  @ViewChild('fileInput') fileInput: ElementRef;

  private selectedFiles = [];
  public importedExercises: any[] = [];
  public filesOnLoad: boolean;

  public test: TestModel;
  public parserOption: SelectParser[] = [
    {label: 'E-testo', value: 'etesto'},
    {label: 'PWR', value: 'pwr'}
  ];
  public selectedParser: SelectParser = this.parserOption[0];
  public errorMsg: string;

  constructor(public appSettings: AppSettingsService,
              private route: ActivatedRoute,
              private headerService: HeaderService,
              private testService: TestService,
              private importService: ImportExerciseService) {
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
          this.headerService.setCurrentRoute(['home', 'tests', this.test.name]);
        },
        error => console.log(error)
      )
    );

  }

  public getFiles(event: any) {
    this.importedExercises = [];
    this.selectedFiles = [].slice.call(event.target.files);
    this.uploadFiles()
  }

  private uploadFiles() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const fileReader = new FileReader();
      this.filesOnLoad = true;
      fileReader.readAsText(this.selectedFiles[i], 'ISO-8859-1');
      fileReader.onload = () => this.importedExercises.push(this.importService.detectExercise(fileReader.result));
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
    this.importedExercises.forEach(x => this.importService.fixExercise(x));
    console.log(this.importedExercises);
  }

  public resetExercises(): void {
    this.importedExercises = [];
    this.selectedFiles = [];
    this.fileInput.nativeElement.value = '';
  }

  public changeParser(parser: SelectParser) {
    this.selectedParser = parser;
  }

}
