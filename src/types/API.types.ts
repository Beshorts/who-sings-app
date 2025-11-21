
export interface Track {
  track_id: number;
  track_name: string;
  artist_name: string;
  track_isrc?: string;
  commontrack_id: number;
  has_lyrics: number;
}

export interface ChartTracksResponse {
  message: {
    body: {
      track_list: Array<{
        track: Track;
      }>;
    };
    header: {
      status_code: number;
      execute_time: number;
    };
  };
}
// API raw response
export interface Lyric {
  lyrics_id: number;
  lyrics_body: string;
  // for lyrics views tracking purpose 
  pixel_tracking_url: string;
  lyrics_copyright: string;
}

export interface TrackLyricsResponse {
  message: {
    body: {
      lyrics: Lyric;
    };
    header: {
      status_code: number;
      execute_time: number;
    };
  };
}
