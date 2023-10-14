import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tweet-item',
  templateUrl: './tweet-item.component.html',
  styleUrls: ['./tweet-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TweetItemComponent {}
