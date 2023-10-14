import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tweet } from 'src/app/models/tweet';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss'],
})
export class TweetListComponent implements OnInit {
  tweets$: Observable<Tweet[]> | undefined;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.tweets$ = this.dataService.getTweetData();
  }
}
