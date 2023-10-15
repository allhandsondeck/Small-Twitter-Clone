import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { PaginationComponent } from './pagination.component';
import { FilterService } from 'src/app/services/filter.service';
import { BehaviorSubject, Subject } from 'rxjs';

describe('PaginationComponent', () => {
  let spectator: Spectator<PaginationComponent>;
  const createComponent = createComponentFactory({
    component: PaginationComponent,
    providers: [
      {
        provide: FilterService,
        useValue: {
          totalPageCountSubject: new Subject<number>(),
          tweetsPerPageSubject: new BehaviorSubject<number>(5),
          currentPageSubject: new BehaviorSubject<number>(1),
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

  it('should handle page change', () => {
    // Arrange
    const filterService = spectator.inject(FilterService);
    const newPage = 2;

    // Act
    spectator.component.onPageChange(newPage);

    // Assert
    expect(filterService.currentPageSubject.getValue()).toBe(newPage);
  });

  it('should handle tweets per page change', () => {
    // Arrange
    const filterService = spectator.inject(FilterService);
    const newTweetsPerPage = 10;

    // Act
    spectator.component.onTweetsPerPageChange(newTweetsPerPage);

    // Assert
    expect(filterService.tweetsPerPageSubject.getValue()).toBe(
      newTweetsPerPage
    );
    expect(filterService.currentPageSubject.getValue()).toBe(1);
  });

  it('should generate a range', () => {
    // Arrange
    const count = 5;

    // Act
    const range = spectator.component.range(count);

    // Assert
    expect(range.length).toBe(count);
    for (let i = 0; i < count; i++) {
      expect(range[i]).toBe(i + 1);
    }
  });
});
