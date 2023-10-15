import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { VisibilityType } from '../enums/visibility-type.enum';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  currentPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  tweetsPerPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    5
  );
  totalPageCountSubject: Subject<number> = new Subject<number>();
  visibilityTypeSubject: BehaviorSubject<VisibilityType> =
    new BehaviorSubject<VisibilityType>(VisibilityType.AllTweets);
}
