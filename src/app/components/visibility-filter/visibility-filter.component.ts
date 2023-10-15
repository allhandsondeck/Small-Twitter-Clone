import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VisibilityType } from 'src/app/enums/visibility-type.enum';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-visibility-filter',
  templateUrl: './visibility-filter.component.html',
  styleUrls: ['./visibility-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisibilityFilterComponent {
  constructor(private paginationService: PaginationService) {}

  visibilityTypes: string[] = ['All tweets', 'Retweeted tweets'];
  visibilityType: string = this.visibilityTypes[0];

  onVisibilityChange(newVisibilityType: VisibilityType) {
    this.paginationService.visibilityTypeSubject.next(newVisibilityType);
    this.paginationService.currentPageSubject.next(1);
  }
}
