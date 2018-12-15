import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestLearnComponent} from './test-learn.component';

describe('TestLearnComponent', () => {
  let component: TestLearnComponent;
  let fixture: ComponentFixture<TestLearnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestLearnComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
