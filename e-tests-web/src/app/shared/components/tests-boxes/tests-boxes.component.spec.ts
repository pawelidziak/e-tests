import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsBoxesComponent } from './tests-boxes.component';

describe('TestsBoxesComponent', () => {
  let component: TestsBoxesComponent;
  let fixture: ComponentFixture<TestsBoxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsBoxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
