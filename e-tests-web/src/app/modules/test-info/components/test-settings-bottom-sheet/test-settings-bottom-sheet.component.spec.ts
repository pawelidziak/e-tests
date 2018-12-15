import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSettingsBottomSheetComponent } from './test-settings-bottom-sheet.component';

describe('TestSettingsBottomSheetComponent', () => {
  let component: TestSettingsBottomSheetComponent;
  let fixture: ComponentFixture<TestSettingsBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSettingsBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSettingsBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
