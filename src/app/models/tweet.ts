export type Tweet = {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  truncated: boolean;
  entities: TweetEntities;
  extended_entities?: TweetExtendedEntities;
  source: string;
  in_reply_to_status_id: null;
  in_reply_to_status_id_str: null;
  in_reply_to_user_id: null;
  in_reply_to_user_id_str: null;
  in_reply_to_screen_name: null;
  user: User;
  geo: null;
  coordinates: null;
  place: null;
  contributors: null;
  is_quote_status: boolean;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  possibly_sensitive?: boolean;
  possibly_sensitive_appealable?: boolean;
  lang: TweetLang;
  retweeted_status?: RetweetedStatus;
  quoted_status_id?: number;
  quoted_status_id_str?: string;
};

export type TweetEntities = {
  hashtags: Hashtag[];
  symbols: any[];
  user_mentions: UserMention[];
  urls: URL[];
  media?: Media[];
};

export type Hashtag = {
  text: string;
  indices: number[];
};

export type Media = {
  id: number;
  id_str: string;
  indices: number[];
  media_url: string;
  media_url_https: string;
  url: string;
  display_url: string;
  expanded_url: string;
  type: Type;
  sizes: Sizes;
  source_status_id?: number;
  source_status_id_str?: string;
  source_user_id?: number;
  source_user_id_str?: string;
  video_info?: VideoInfo;
  additional_media_info?: AdditionalMediaInfo;
};

export type AdditionalMediaInfo = {
  monetizable: boolean;
};

export type Sizes = {
  medium: Large;
  thumb: Large;
  small: Large;
  large: Large;
};

export type Large = {
  w: number;
  h: number;
  resize: Resize;
};

export enum Resize {
  Crop = 'crop',
  Fit = 'fit',
}

export enum Type {
  AnimatedGIF = 'animated_gif',
  Photo = 'photo',
  Video = 'video',
}

export type VideoInfo = {
  aspect_ratio: number[];
  variants: Variant[];
  duration_millis?: number;
};

export type Variant = {
  bitrate?: number;
  content_type: string;
  url: string;
};

export type URL = {
  url: string;
  expanded_url: string;
  display_url: string;
  indices: number[];
};

export type UserMention = {
  screen_name: string;
  name: string;
  id: number;
  id_str: string;
  indices: number[];
};

export type TweetExtendedEntities = {
  media: Media[];
};

export enum TweetLang {
  En = 'en',
  Und = 'und',
}

export type RetweetedStatus = {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  truncated: boolean;
  entities: RetweetedStatusEntities;
  extended_entities?: RetweetedStatusExtendedEntities;
  source: string;
  in_reply_to_status_id: null;
  in_reply_to_status_id_str: null;
  in_reply_to_user_id: null;
  in_reply_to_user_id_str: null;
  in_reply_to_screen_name: null;
  user: User;
  geo: null;
  coordinates: null;
  place: Place | null;
  contributors: null;
  is_quote_status: boolean;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  possibly_sensitive?: boolean;
  possibly_sensitive_appealable?: boolean;
  lang: TweetLang;
  quoted_status_id?: number;
  quoted_status_id_str?: string;
  quoted_status?: QuotedStatus;
};

export type RetweetedStatusEntities = {
  hashtags: Hashtag[];
  symbols: any[];
  user_mentions: UserMention[];
  urls: URL[];
  media?: StatusMedia[];
};

export type StatusMedia = {
  id: number;
  id_str: string;
  indices: number[];
  media_url: string;
  media_url_https: string;
  url: string;
  display_url: string;
  expanded_url: string;
  type: Type;
  sizes: Sizes;
};

export type RetweetedStatusExtendedEntities = {
  media: StatusMedia[];
};

export type Place = {
  id: string;
  url: string;
  place_type: string;
  name: string;
  full_name: string;
  country_code: string;
  country: string;
  contained_within: any[];
  bounding_box: BoundingBox;
  attributes: Attributes;
};

export type Attributes = {};

export type BoundingBox = {
  type: string;
  coordinates: Array<Array<number[]>>;
};

export type QuotedStatus = {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  truncated: boolean;
  entities: TweetEntities;
  source: string;
  in_reply_to_status_id: null;
  in_reply_to_status_id_str: null;
  in_reply_to_user_id: null;
  in_reply_to_user_id_str: null;
  in_reply_to_screen_name: null;
  user: User;
  geo: null;
  coordinates: null;
  place: null;
  contributors: null;
  is_quote_status: boolean;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  lang: TweetLang;
  quoted_status_id?: number;
  quoted_status_id_str?: string;
  possibly_sensitive?: boolean;
  possibly_sensitive_appealable?: boolean;
};

export type User = {
  id: number | number;
  id_str: string;
  name: string;
  screen_name: string;
  location: string;
  description: string;
  url: null | string;
  entities: UserEntities;
  protected: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  created_at: string;
  favourites_count: number;
  utc_offset: null;
  time_zone: null;
  geo_enabled: boolean;
  verified: boolean;
  statuses_count: number;
  lang: UserLang;
  contributors_enabled: boolean;
  is_translator: boolean;
  is_translation_enabled: boolean;
  profile_background_color: string;
  profile_background_image_url: null | string;
  profile_background_image_url_https: null | string;
  profile_background_tile: boolean;
  profile_image_url: string;
  profile_image_url_https: string;
  profile_banner_url?: string;
  profile_link_color: string;
  profile_sidebar_border_color: string;
  profile_sidebar_fill_color: string;
  profile_text_color: string;
  profile_use_background_image: boolean;
  has_extended_profile: boolean;
  default_profile: boolean;
  default_profile_image: boolean;
  following: boolean;
  follow_request_sent: boolean;
  notifications: boolean;
  translator_type: TranslatorType;
};

export type UserEntities = {
  url?: Description;
  description: Description;
};

export type Description = {
  urls: URL[];
};

export enum UserLang {
  En = 'en',
  Pt = 'pt',
  Tr = 'tr',
}

export enum TranslatorType {
  None = 'none',
}
