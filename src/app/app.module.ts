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
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { HandleLinkPipe } from './pipes/handle-link.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TweetFiltersComponent,
    SearchBoxComponent,
    VisibilityFilterComponent,
    PaginationComponent,
    TweetListComponent,
    TweetItemComponent,
    HandleLinkPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
