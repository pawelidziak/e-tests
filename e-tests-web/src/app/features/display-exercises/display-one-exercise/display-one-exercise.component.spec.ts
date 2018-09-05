import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOneExerciseComponent } from './display-one-exercise.component';

describe('DisplayOneExerciseComponent', () => {
  let component: DisplayOneExerciseComponent;
  let fixture: ComponentFixture<DisplayOneExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOneExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOneExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
