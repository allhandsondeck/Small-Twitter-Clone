import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, combineLatest, of, switchMap, takeUntil } from 'rxjs';
import { VisibilityType } from 'src/app/enums/visibility-type.enum';
import { Tweet } from 'src/app/models/tweet';
import { DataService } from 'src/app/services/data.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TweetListComponent implements OnInit, OnDestroy {
  tweets: Tweet[] | undefined;
  private destroy$: Subject<void> = new Subject();

  constructor(
    private dataService: DataService,
    private FilterService: FilterService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dataService
      .getTweetData()
      .pipe(
        takeUntil(this.destroy$),
        switchMap((tweets) => {
          return combineLatest([
            of(tweets),
            this.FilterService.searchKeywordSubject,
            this.FilterService.visibilityTypeSubject,
            this.FilterService.currentPageSubject,
            this.FilterService.tweetsPerPageSubject,
          ]);
        })
      )
      .subscribe(
        ([
          tweets,
          newSearchKeyword,
          newVisibilityType,
          newPage,
          newTweetsPerPage,
        ]) => {
          const searchKeyword = newSearchKeyword;
          const currentPage = newPage;
          const tweetsPerPage = newTweetsPerPage;
          const tweetsFilteredByHandleOrName =
            this.getTweetsFilteredByHandleOrName(searchKeyword, tweets);
          const tweetsFilteredByVisibilityType =
            this.getTweetsFilteredByVisibilityType(
              newVisibilityType,
              tweetsFilteredByHandleOrName
            );
          this.tweets = this.getTweetsFilteredByPagination(
            tweetsFilteredByVisibilityType,
            currentPage,
            tweetsPerPage
          );
          this.setTotalPageCount(
            tweetsFilteredByVisibilityType.length,
            tweetsPerPage
          );
          this.cd.detectChanges();
        }
      );
  }

  private getTweetsFilteredByHandleOrName(
    searchKeyword: string,
    tweets: Tweet[]
  ) {
    return tweets.filter(
      (tweet) =>
        tweet.user.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        tweet.user.screen_name
          .toLowerCase()
          .includes(searchKeyword.toLowerCase())
    );
  }

  private getTweetsFilteredByVisibilityType(
    visibilityType: VisibilityType,
    tweets: Tweet[]
  ): Tweet[] {
    switch (visibilityType) {
      case VisibilityType.AllTweets:
        return tweets;

      case VisibilityType.RetweetedTweets:
        return tweets?.filter((tweet) => tweet.retweeted_status);
    }
  }

  private setTotalPageCount(
    tweetsFilteredByVisibilityTypeLength: number,
    tweetsPerPage: number
  ) {
    const totalPageCount = Math.ceil(
      tweetsFilteredByVisibilityTypeLength / tweetsPerPage
    );
    this.FilterService.totalPageCountSubject.next(totalPageCount);
  }

  private getTweetsFilteredByPagination(
    tweetsFilteredByVisibilityType: Tweet[],
    currentPage: number,
    tweetsPerPage: number
  ): Tweet[] {
    const startIndex = (currentPage - 1) * tweetsPerPage;
    const endIndex = startIndex + tweetsPerPage;
    return tweetsFilteredByVisibilityType.slice(startIndex, endIndex);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
