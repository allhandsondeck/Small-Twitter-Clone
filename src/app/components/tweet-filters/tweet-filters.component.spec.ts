import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TweetFiltersComponent } from './tweet-filters.component';

describe('TweetFiltersComponent', () => {
  let spectator: Spectator<TweetFiltersComponent>;
  const createComponent = createComponentFactory(TweetFiltersComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
