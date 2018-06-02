import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OneExerciseComponent} from './one-exercise.component';

describe('OneExerciseComponent', () => {
  let component: OneExerciseComponent;
  let fixture: ComponentFixture<OneExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OneExerciseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
