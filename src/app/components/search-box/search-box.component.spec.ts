import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { SearchBoxComponent } from './search-box.component';
import { FilterService } from 'src/app/services/filter.service';
import { BehaviorSubject } from 'rxjs';

describe('SearchBoxComponent', () => {
  let spectator: Spectator<SearchBoxComponent>;
  const createComponent = createComponentFactory({
    component: SearchBoxComponent,
    providers: [
      {
        provide: FilterService,
        useValue: {
          searchKeywordSubject: new BehaviorSubject<string>(''),
        },
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should handle search change', () => {
    // Arrange
    const filterService = spectator.inject(FilterService);
    const keyword = 'search keyword';

    // Act
    spectator.component.onSearchChange(keyword);

    // Assert
    expect(filterService.searchKeywordSubject.getValue()).toBe(keyword);
  });

  it('should clear search', () => {
    // Arrange
    const filterService = spectator.inject(FilterService);
    const keyword = 'search keyword';

    // Act
    spectator.component.clearSearch();

    // Assert
    expect(filterService.searchKeywordSubject.getValue()).toBe('');
    expect(spectator.component.value).toBe('');
  });
});
