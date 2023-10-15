import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  constructor(private paginationService: PaginationService) {}
  totalPageCount$: Subject<number> =
    this.paginationService.totalPageCountSubject;
  tweetsPerPage: number = this.paginationService.tweetsPerPageSubject.value;

  onPageChange(newPage: number) {
    this.paginationService.currentPageSubject.next(newPage);
  }

  onTweetsPerPageChange(newTweetsPerPage: number) {
    this.paginationService.tweetsPerPageSubject.next(newTweetsPerPage);
    this.paginationService.currentPageSubject.next(1);
  }

  range(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }
}
