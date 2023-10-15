import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, combineLatest, startWith, takeUntil } from 'rxjs';
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
  allTweets: Tweet[] | undefined;
  filteredTweets: Tweet[] | undefined;
  currentPage: number = 1;
  tweetsPerPage: number | undefined;
  totalTweets: number | undefined;
  private destroy$: Subject<void> = new Subject();

  constructor(
    private dataService: DataService,
    private paginationService: PaginationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    combineLatest([
      this.paginationService.currentPageSubject,
      this.paginationService.tweetsPerPageSubject,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([newPage, newTweetsPerPage]) => {
        this.currentPage = newPage;
        this.tweetsPerPage = newTweetsPerPage;
        this.setTotalPageCount();
        this.getPaginatedTweets();
        this.cd.detectChanges();
      });

    this.dataService
      .getTweetData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((tweets) => {
        this.allTweets = tweets;
        this.totalTweets = tweets.length;
        this.setTotalPageCount();
        this.getPaginatedTweets();
        this.cd.detectChanges();
      });
  }

  private setTotalPageCount() {
    if (this.totalTweets && this.tweetsPerPage) {
      const totalPageCount = Math.ceil(this.totalTweets / this.tweetsPerPage);
      this.paginationService.totalPageCountSubject.next(totalPageCount);
    }
  }

  private getPaginatedTweets(): void {
    const startIndex = (this.currentPage - 1) * this.tweetsPerPage!;
    const endIndex = startIndex + this.tweetsPerPage!;
    this.filteredTweets = this.allTweets?.slice(startIndex, endIndex);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
