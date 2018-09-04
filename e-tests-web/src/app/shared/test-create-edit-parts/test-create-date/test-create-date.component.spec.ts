import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCreateDateComponent } from './test-create-date.component';

describe('TestCreateDateComponent', () => {
  let component: TestCreateDateComponent;
  let fixture: ComponentFixture<TestCreateDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCreateDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCreateDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
