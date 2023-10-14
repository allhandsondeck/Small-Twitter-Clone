import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilityFilterComponent } from './visibility-filter.component';

describe('VisibilityFilterComponent', () => {
  let component: VisibilityFilterComponent;
  let fixture: ComponentFixture<VisibilityFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisibilityFilterComponent]
    });
    fixture = TestBed.createComponent(VisibilityFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
