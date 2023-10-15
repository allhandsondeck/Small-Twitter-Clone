import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  currentPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  tweetsPerPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    5
  );
  totalPageCountSubject: Subject<number> = new Subject<number>();
}
