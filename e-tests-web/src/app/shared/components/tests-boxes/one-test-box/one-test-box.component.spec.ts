import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTestBoxComponent } from './one-test-box.component';

describe('OneTestBoxComponent', () => {
  let component: OneTestBoxComponent;
  let fixture: ComponentFixture<OneTestBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneTestBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneTestBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
