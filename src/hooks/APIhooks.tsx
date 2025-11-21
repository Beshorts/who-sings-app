import { useState, useEffect } from 'react';
import { musixmatchAPI } from '../services/API';
import type { ChartTracksResponse, Track, TrackLyricsResponse } from '../types/API.types';

export const useChartTracks = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchTracks = async () => {
      setLoading(true);
      setError(null);

      try {
        const data: ChartTracksResponse = await musixmatchAPI.getChartTracks();

        if (cancelled) return;

        const parsed = data.message.body.track_list.map(item => {
          const t = item.track;

          return {
            track_id: t.track_id,
            track_name: t.track_name,
            artist_name: t.artist_name,
            track_isrc: t.track_isrc,
            commontrack_id: t.commontrack_id,
            has_lyrics: t.has_lyrics,
          } satisfies Track;
        });

        setTracks(parsed);
        sessionStorage.setItem('chartTracks', JSON.stringify(parsed));
        
      } catch (err: unknown) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchTracks();

    return () => {
      cancelled = true;
    };
  }, []);

  return { tracks, loading, error };
};



export interface ParsedLyrics {
  id: number;
  body: string;
  copyright: string;
  pixelTrackingUrl: string;
}

export const useTrackLyrics = ({
  trackIsrc,
  commontrackId
}: {
  trackIsrc?: string;
  commontrackId: number;
}) => {
  const [lyrics, setLyrics] = useState<ParsedLyrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!trackIsrc && commontrackId === null) return;

    let cancelled = false;

    const fetchLyrics = async () => {
      setLoading(true);
      setError(null);

      try {
        const data: TrackLyricsResponse = await musixmatchAPI.getTrackLyrics(
          trackIsrc,
          trackIsrc ? undefined : commontrackId
        );

        if (cancelled) return;

        const lyric = data.message.body.lyrics;

        const parsed = {
          id: lyric.lyrics_id,
          body: lyric.lyrics_body,
          copyright: lyric.lyrics_copyright,
          pixelTrackingUrl: lyric.pixel_tracking_url
        } satisfies ParsedLyrics;

        setLyrics(parsed);
      } catch (err: unknown) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchLyrics();

    return () => {
      cancelled = true;
    };
  }, [trackIsrc, commontrackId]);

  return { lyrics, loading, error };
};