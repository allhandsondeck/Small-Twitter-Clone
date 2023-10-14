import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-visibility-filter',
  templateUrl: './visibility-filter.component.html',
  styleUrls: ['./visibility-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisibilityFilterComponent {
  visibilityType: string | undefined;
  visibilityTypes: string[] = ['All tweets', 'Retweeted tweets'];
}
