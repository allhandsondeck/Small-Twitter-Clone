import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tweet } from '../models/tweet';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataPath = 'assets/data.json';

  constructor(private http: HttpClient) {}

  getTweetData(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(this.dataPath);
  }
}
