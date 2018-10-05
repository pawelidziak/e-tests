import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyHideToolbarComponent } from './sticky-hide-toolbar.component';

describe('StickyHideToolbarComponent', () => {
  let component: StickyHideToolbarComponent;
  let fixture: ComponentFixture<StickyHideToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StickyHideToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StickyHideToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
