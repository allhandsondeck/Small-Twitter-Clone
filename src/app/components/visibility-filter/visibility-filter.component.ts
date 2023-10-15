import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VisibilityType } from 'src/app/enums/visibility-type.enum';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-visibility-filter',
  templateUrl: './visibility-filter.component.html',
  styleUrls: ['./visibility-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisibilityFilterComponent {
  constructor(private FilterService: FilterService) {}

  visibilityTypes: string[] = ['All tweets', 'Retweeted tweets'];
  visibilityType: string = this.visibilityTypes[0];

  onVisibilityChange(newVisibilityType: VisibilityType) {
    this.FilterService.visibilityTypeSubject.next(newVisibilityType);
    this.FilterService.currentPageSubject.next(1);
  }
}
