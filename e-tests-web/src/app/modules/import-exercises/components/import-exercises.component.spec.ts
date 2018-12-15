import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExercisesComponent } from './import-exercises.component';

describe('ImportExercisesComponent', () => {
  let component: ImportExercisesComponent;
  let fixture: ComponentFixture<ImportExercisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportExercisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
