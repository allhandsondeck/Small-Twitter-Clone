import { Component, OnInit } from '@angular/core';
import { Tweet } from 'src/app/models/tweet';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss'],
})
export class TweetListComponent implements OnInit {
  tweets: Tweet[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getTweetData().subscribe((tweets) => {
      this.tweets = tweets;
    });
  }
}
