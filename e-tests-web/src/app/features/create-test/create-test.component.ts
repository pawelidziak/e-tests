import {Component, OnInit} from '@angular/core';
import {HeaderButtonType, HeaderService} from '../../core/services/header.service';
import {Test} from '../../core/models/Test';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RWDService} from '../../core/services/RWD.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {

  public isSmallScreen = false;
  public newTest: Test;
  public firstStep: FormGroup;
  public secondStep: FormGroup;
  private readonly HEADER_TEXT = 'Create';

  constructor(private headerService: HeaderService,
              private rwdService: RWDService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getRWDValue();
    this.createStepper();
    this.headerService.setHeaderButtonAndText(HeaderButtonType.BACK, this.HEADER_TEXT);
    this.defineEmptyTestInterface();
  }

  public saveTest(): void {
    console.log(this.newTest);
  }

  private createStepper(): void {
    this.firstStep = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondStep = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  private getRWDValue(): void {
    const RWDsub$ = this.rwdService.isSmallScreen.subscribe(res => {
      this.isSmallScreen = res;
    });
  }

  private defineEmptyTestInterface() {
    this.newTest = {
      testName: '',
      exercises: [],
      section: '',
      author: ''
    };
  }

}
