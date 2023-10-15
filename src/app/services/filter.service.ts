import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { VisibilityType } from '../enums/visibility-type.enum';
import { Tweet } from '../models/tweet';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  searchKeywordSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  visibilityTypeSubject: BehaviorSubject<VisibilityType> =
    new BehaviorSubject<VisibilityType>(VisibilityType.AllTweets);
  currentPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  tweetsPerPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    5
  );
  totalPageCountSubject: Subject<number> = new Subject<number>();

  filterTweets(
    tweets: Tweet[],
    searchKeyword: string,
    visibilityType: VisibilityType,
    currentPage: number,
    tweetsPerPage: number
  ): Tweet[] {
    const tweetsFilteredByHandleOrName = this.filterByHandleOrName(
      searchKeyword,
      tweets
    );
    const tweetsFilteredByVisibilityType = this.filterByVisibilityType(
      visibilityType,
      tweetsFilteredByHandleOrName
    );

    this.setTotalPageCount(
      tweetsFilteredByVisibilityType.length,
      tweetsPerPage
    );

    return this.filterByPagination(
      tweetsFilteredByVisibilityType,
      currentPage,
      tweetsPerPage
    );
  }

  filterByHandleOrName(searchKeyword: string, tweets: Tweet[]): Tweet[] {
    return tweets.filter(
      (tweet) =>
        tweet.user.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        tweet.user.screen_name
          .toLowerCase()
          .includes(searchKeyword.toLowerCase())
    );
  }

  filterByVisibilityType(
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

  setTotalPageCount(
    tweetsFilteredByVisibilityTypeLength: number,
    tweetsPerPage: number
  ) {
    const totalPageCount = Math.ceil(
      tweetsFilteredByVisibilityTypeLength / tweetsPerPage
    );
    this.totalPageCountSubject.next(totalPageCount);
  }

  filterByPagination(
    tweets: Tweet[],
    currentPage: number,
    tweetsPerPage: number
  ): Tweet[] {
    const startIndex = (currentPage - 1) * tweetsPerPage;
    const endIndex = startIndex + tweetsPerPage;
    return tweets.slice(startIndex, endIndex);
  }
}
