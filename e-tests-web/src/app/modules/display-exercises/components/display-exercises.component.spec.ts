import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayExercisesComponent } from './display-exercises.component';

describe('DisplayExercisesComponent', () => {
  let component: DisplayExercisesComponent;
  let fixture: ComponentFixture<DisplayExercisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayExercisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
