import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTagsComponent } from './test-tags.component';

describe('TestTagsComponent', () => {
  let component: TestTagsComponent;
  let fixture: ComponentFixture<TestTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
