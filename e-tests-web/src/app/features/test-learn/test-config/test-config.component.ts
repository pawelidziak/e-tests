import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TestConfig} from '../../../core/models/Test';
import {MatDrawer} from '@angular/material';
import {RWDService} from '../../../core/services/RWD.service';
import {Router} from '@angular/router';
import {ALL_ROUTES} from '../../../shared/ROUTES';

export interface TestConfigWithRestart {
  config: TestConfig;
  restartTestProgress: boolean;
}

@Component({
  selector: 'app-test-config',
  templateUrl: './test-config.component.html',
  styleUrls: ['./test-config.component.scss']
})
export class TestConfigComponent implements OnInit, OnDestroy {
  private readonly DEFAULT_OCCURRENCES = 2;
  private readonly DEFAULT_REPETITIONS = 2;
  private subscriptions: any[] = [];

  @Input() testId: string;
  @Input() configDrawer: MatDrawer;
  @Input() occurrencesExerciseNumber: number;
  @Input() repetitionExerciseNumber: number;
  @Input() testIsNewOrInProgress: boolean;

  @Input() testIsEnd: boolean;

  @Output() saveSettings: EventEmitter<TestConfigWithRestart> = new EventEmitter();
  public confirmRestart: boolean;
  public isSmallScreen: boolean;

  constructor(private rwdService: RWDService,
              private router: Router) {
  }

  ngOnInit() {
    this.getRWDValue();
    if (!this.occurrencesExerciseNumber) {
      this.occurrencesExerciseNumber = this.DEFAULT_OCCURRENCES;
    }
    if (!this.repetitionExerciseNumber) {
      this.repetitionExerciseNumber = this.DEFAULT_REPETITIONS;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public closeDrawer(reset: boolean = this.testIsNewOrInProgress): void {
    const settings: TestConfigWithRestart = {
      config: {
        occurrencesNumber: this.occurrencesExerciseNumber,
        repetitionNumber: this.repetitionExerciseNumber
      },
      restartTestProgress: reset
    };

    this.saveSettings.emit(settings);

    if (this.confirmRestart) {
      this.confirmRestart = false;
    }
  }

  private getRWDValue(): void {
    this.subscriptions.push(
      this.rwdService.isSmallScreen.subscribe(res => {
        this.isSmallScreen = res;
      })
    );
  }

  public backToTest(): void {
    this.router.navigate([`${ALL_ROUTES.CREATED_TEST}/${this.testId}`]);
  }
}
