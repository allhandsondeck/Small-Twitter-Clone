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
import { PaginationService } from 'src/app/services/pagination.service';

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
    private paginationService: PaginationService,
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
            this.paginationService.currentPageSubject,
            this.paginationService.tweetsPerPageSubject,
            this.paginationService.visibilityTypeSubject,
          ]);
        })
      )
      .subscribe(([tweets, newPage, newTweetsPerPage, newVisibilityType]) => {
        const currentPage = newPage;
        const tweetsPerPage = newTweetsPerPage;
        const tweetsFilteredByVisibilityType = this.getTweetsPerVisibilityType(
          newVisibilityType,
          tweets
        );
        this.setTotalPageCount(
          tweetsFilteredByVisibilityType.length,
          tweetsPerPage
        );
        this.getPaginatedTweets(
          tweetsFilteredByVisibilityType,
          currentPage,
          tweetsPerPage
        );
        this.cd.detectChanges();
      });
  }

  private getTweetsPerVisibilityType(
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
    this.paginationService.totalPageCountSubject.next(totalPageCount);
  }

  private getPaginatedTweets(
    tweetsFilteredByVisibilityType: Tweet[] | undefined,
    currentPage: number,
    tweetsPerPage: number
  ): void {
    const startIndex = (currentPage - 1) * tweetsPerPage;
    const endIndex = startIndex + tweetsPerPage;
    this.tweets = tweetsFilteredByVisibilityType?.slice(startIndex, endIndex);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
