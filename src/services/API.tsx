/**
 * Calls Netlify Functions that handle API requests to Musixmatch in a serverless setup.
 * Musixmatch API key is never exposed on the client side.
 * Functions also bypass strict CORS restrictions of the Musixmatch API.
 * 
 * Query Parameters
 * getChartTracks():
 * - @params country (string): country code for chart tracks. Provided by user input.
 * 
 * getTrackLyrics():
 * - if it exists, use track_isrc over commontrack_id as recommended by Musixmatch API documentation
 * - @params track_isrc (string, optional): ISRC code of the track.
 * - @params commontrack_id (number, optional): commontrack ID of the track.
 * 
 * 
 * Returns 
 * - JSON data from the respective Netlify Function.
 */

const BASE_URL = '/.netlify/functions';

export const musixmatchAPI = {
  async getChartTracks(country: string) {
    const res = await fetch(`${BASE_URL}/chartTracks?country=${country}`);
    const data = await res.json();
    return data;
  },

  async getTrackLyrics(trackIsrc?: string, commontrackId?: number) {
    const params = new URLSearchParams();
    if (trackIsrc) params.append('track_isrc', trackIsrc);
    if (commontrackId) params.append('commontrack_id', commontrackId?.toString() || '');
    const res = await fetch(`${BASE_URL}/trackLyrics?${params}`);
    const data = await res.json();
    return data;
  }
};
