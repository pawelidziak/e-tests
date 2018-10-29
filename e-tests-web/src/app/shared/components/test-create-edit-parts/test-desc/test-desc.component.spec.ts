import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDescComponent } from './test-desc.component';

describe('TestDescComponent', () => {
  let component: TestDescComponent;
  let fixture: ComponentFixture<TestDescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
