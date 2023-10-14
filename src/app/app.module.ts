import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TweetFiltersComponent } from './components/tweet-filters/tweet-filters.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { VisibilityFilterComponent } from './components/visibility-filter/visibility-filter.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TweetListComponent } from './components/tweet-list/tweet-list.component';
import { TweetItemComponent } from './components/tweet-item/tweet-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TweetFiltersComponent,
    SearchBoxComponent,
    VisibilityFilterComponent,
    PaginationComponent,
    TweetListComponent,
    TweetItemComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
