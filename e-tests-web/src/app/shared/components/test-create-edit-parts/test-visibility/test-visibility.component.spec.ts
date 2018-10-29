import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestVisibilityComponent } from './test-visibility.component';

describe('TestVisibilityComponent', () => {
  let component: TestVisibilityComponent;
  let fixture: ComponentFixture<TestVisibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestVisibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
