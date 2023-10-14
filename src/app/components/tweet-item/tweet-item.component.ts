import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tweet } from 'src/app/models/tweet';

@Component({
  selector: 'app-tweet-item',
  templateUrl: './tweet-item.component.html',
  styleUrls: ['./tweet-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TweetItemComponent {
  imgError: boolean | undefined;
  @Input() tweet!: Tweet;
}
