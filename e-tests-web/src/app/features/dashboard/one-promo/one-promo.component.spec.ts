import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePromoComponent } from './one-promo.component';

describe('OnePromoComponent', () => {
  let component: OnePromoComponent;
  let fixture: ComponentFixture<OnePromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnePromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnePromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
