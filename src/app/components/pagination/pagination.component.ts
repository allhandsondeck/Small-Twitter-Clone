import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  constructor(private FilterService: FilterService) {}
  totalPageCount$: Subject<number> = this.FilterService.totalPageCountSubject;
  tweetsPerPage: number = this.FilterService.tweetsPerPageSubject.value;

  onPageChange(newPage: number) {
    this.FilterService.currentPageSubject.next(newPage);
  }

  onTweetsPerPageChange(newTweetsPerPage: number) {
    this.FilterService.tweetsPerPageSubject.next(newTweetsPerPage);
    this.FilterService.currentPageSubject.next(1);
  }

  range(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }
}
