import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent {
  constructor(private FilterService: FilterService) {}
  value = '';

  onSearchChange(keyword: string) {
    this.FilterService.searchKeywordSubject.next(keyword);
  }

  clearSearch() {
    this.value = '';
    this.FilterService.searchKeywordSubject.next('');
  }
}
