import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent {
  constructor(private paginationService: PaginationService) {}
  value = '';

  onSearchChange(keyword: string) {
    this.paginationService.searchKeywordSubject.next(keyword);
  }

  clearSearch() {
    this.value = '';
    this.paginationService.searchKeywordSubject.next('');
  }
}
