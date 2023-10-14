import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetFiltersComponent } from './tweet-filters.component';

describe('TweetFiltersComponent', () => {
  let component: TweetFiltersComponent;
  let fixture: ComponentFixture<TweetFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TweetFiltersComponent]
    });
    fixture = TestBed.createComponent(TweetFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
