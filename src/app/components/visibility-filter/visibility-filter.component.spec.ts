import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { VisibilityFilterComponent } from './visibility-filter.component';
import { FilterService } from 'src/app/services/filter.service';
import { VisibilityType } from 'src/app/enums/visibility-type.enum';
import { BehaviorSubject } from 'rxjs';

describe('VisibilityFilterComponent', () => {
  let spectator: Spectator<VisibilityFilterComponent>;
  const createComponent = createComponentFactory({
    component: VisibilityFilterComponent,
    providers: [
      {
        provide: FilterService,
        useValue: {
          visibilityTypeSubject: new BehaviorSubject<VisibilityType>(
            VisibilityType.AllTweets
          ),
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

  it('should handle visibility change', () => {
    // Arrange
    const filterService = spectator.inject(FilterService);
    const newVisibilityType = VisibilityType.RetweetedTweets;

    // Act
    spectator.component.onVisibilityChange(newVisibilityType);

    // Assert
    expect(filterService.visibilityTypeSubject.getValue()).toBe(
      newVisibilityType
    );
    expect(filterService.currentPageSubject.getValue()).toBe(1);
  });

  it('should set initial visibility type', () => {
    // Arrange
    const initialVisibilityType = VisibilityType.AllTweets;

    // Assert
    expect(spectator.component.visibilityType).toBe(initialVisibilityType);
  });
});
