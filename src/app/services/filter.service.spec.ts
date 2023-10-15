import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { VisibilityType } from '../enums/visibility-type.enum';
import { Tweet, User } from '../models/tweet';
import { FilterService } from './filter.service';

describe('FilterService', () => {
  let spectator: SpectatorService<FilterService>;
  const createService = createServiceFactory(FilterService);

  beforeEach(() => (spectator = createService()));

  it('should be created', () => {
    // Assert
    expect(spectator.service).toBeTruthy();
  });

  it('should filter tweets by handle or name', () => {
    // Arrange
    const tweets: Partial<Tweet>[] = [
      { user: { name: 'John', screen_name: 'johndoe' } },
      { user: { name: 'Alice', screen_name: 'alice123' } },
    ];
    const searchKeyword = 'john';

    // Act
    const filteredTweets = spectator.service.filterByHandleOrName(
      searchKeyword,
      tweets as Tweet[]
    );

    // Assert
    expect(filteredTweets.length).toBe(1);
    expect(filteredTweets[0].user!.name).toBe('John');
  });

  it('should filter tweets by visibility type', () => {
    // Arrange
    const tweets = [
      {
        user: { name: 'John', screen_name: 'johndoe' },
        retweeted_status: undefined,
      } as Partial<User>,
      {
        user: { name: 'Alice', screen_name: 'alice123' },
        retweeted_status: { created_at: '', id: 1 },
      } as Partial<User>,
    ];
    const visibilityType = VisibilityType.RetweetedTweets;

    // Act
    const filteredTweets = spectator.service.filterByVisibilityType(
      visibilityType,
      tweets as Tweet[]
    );

    // Assert
    expect(filteredTweets.length).toBe(1);
    expect(filteredTweets[0].user!.name).toBe('Alice');
  });

  it('should set total page count', () => {
    // Arrange
    const totalTweets = 10;
    const tweetsPerPage = 5;

    // Act
    spectator.service.setTotalPageCount(totalTweets, tweetsPerPage);

    // Assert
    spectator.service.totalPageCountSubject.subscribe((totalPageCount) => {
      expect(totalPageCount).toBe(2);
    });
  });

  it('should filter tweets by pagination', () => {
    // Arrange
    const tweets: Partial<Tweet>[] = [
      {
        user: {
          name: 'Tweet 1',
          id: 1,
          id_str: '1',
          screen_name: 'user1',
          location: 'Location1',
        },
      },
      {
        user: {
          name: 'Tweet 2',
          id: 2,
          id_str: '2',
          screen_name: 'user2',
          location: 'Location2',
        },
      },
      {
        user: {
          name: 'Tweet 3',
          id: 3,
          id_str: '3',
          screen_name: 'user3',
          location: 'Location3',
        },
      },
    ];
    const currentPage = 2;
    const tweetsPerPage = 1;

    // Act
    const filteredTweets = spectator.service.filterByPagination(
      tweets as Tweet[],
      currentPage,
      tweetsPerPage
    );

    // Assert
    expect(filteredTweets.length).toBe(1);
    expect(filteredTweets[0].user!.name).toBe('Tweet 2');
  });

  it('should filter tweets using filterTweets', () => {
    // Arrange
    const tweets: Partial<Tweet>[] = [
      {
        user: {
          name: 'john',
          id: 1,
          id_str: '1',
          screen_name: 'user1',
          location: 'Location1',
        },
      },
      {
        user: {
          name: 'alice',
          id: 2,
          id_str: '2',
          screen_name: 'user2',
          location: 'Location2',
        },
      },
      {
        user: {
          name: 'mark',
          id: 3,
          id_str: '3',
          screen_name: 'user3',
          location: 'Location3',
        },
      },
    ];
    const searchKeyword = 'john';
    const visibilityType = VisibilityType.AllTweets;
    const currentPage = 1;
    const tweetsPerPage = 1;

    // Act
    const filteredTweets = spectator.service.filterTweets(
      tweets as Tweet[],
      searchKeyword,
      visibilityType,
      currentPage,
      tweetsPerPage
    );

    // Assert
    expect(filteredTweets.length).toBe(1);
    expect(filteredTweets[0].user!.name).toBe('john');
  });
});
