import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, combineLatest, of, switchMap, takeUntil } from 'rxjs';
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
    private filterService: FilterService,
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
            this.filterService.searchKeywordSubject,
            this.filterService.visibilityTypeSubject,
            this.filterService.currentPageSubject,
            this.filterService.tweetsPerPageSubject,
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
          this.tweets = this.filterService.filterTweets(
            tweets,
            newSearchKeyword,
            newVisibilityType,
            newPage,
            newTweetsPerPage
          );

          this.cd.detectChanges();
        }
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
