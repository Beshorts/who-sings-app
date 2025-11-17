import type { Handler } from '@netlify/functions';
import type { TrackLyricsResponse } from '../../src/types/API.types';

/** REQUIRED BY NETLIFY PLATFORM TO VALIDATE THE RESPONSE
 * Type guard that validates if a JSON payload matches ChartTracksResponse.
 * Ensures:
 * - payload is an object
 * - contains a "message" object
 * - contains a "header" object inside message
 * - contains a numeric "status_code"
 */

function isTrackLyricsResponse(raw: unknown): raw is TrackLyricsResponse {
  if (typeof raw !== 'object' || raw === null) return false;

  if (!('message' in raw)) return false;
  const message = (raw as { message?: unknown }).message;

  if (typeof message !== 'object' || message === null) return false;

  if (!('header' in message)) return false;
  const header = (message as { header?: unknown }).header;

  if (typeof header !== 'object' || header === null) return false;

  if (!('status_code' in header)) return false;
  const statusCode = (header as { status_code?: unknown }).status_code;

  return typeof statusCode === 'number';
}

/**
 * Netlify Function to fetch lyrics for a specific track from Musixmatch API.
 *
 * - Handles the API request in a serverless environment to keep the API key hidden.
 * - Bypasses Musixmatch CORS restrictions.
 *
 * Query Parameters:
 * if it exists, use track_isrc over commontrack_id as recommended by Musixmatch API documentation
 * - @params track_isrc (string, optional): the ISRC code of the track.
 * - @params commontrack_id (number, optional): the commontrack ID of the track.
 * Notes: those params are provided by game logic
 *
 * Returns:
 * - JSON with track lyrics.
 * - Returns HTTP 500 if the Musixmatch API returns an error.
 */

// Add a small ambient declaration for process.env at the top 
// so TypeScript knows about process and the MUSIXMATCH_KEY. 
declare const process: { env: { MUSIXMATCH_KEY?: string; MUSIXMATCH_BASE_URL: string }; };
const API_KEY = process.env.MUSIXMATCH_KEY;
const BASE_URL = process.env.MUSIXMATCH_BASE_URL;

// make sure the API key is defined
if (!API_KEY) {
  throw new Error('MUSIXMATCH_KEY non trovata');
}

export const handler: Handler = async (event) => {
  try {
    const trackIsrc = event.queryStringParameters?.track_isrc;
    const commontrackId = event.queryStringParameters?.commontrack_id;

    if (!trackIsrc && !commontrackId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Devi fornire track_isrc se esiste o in alternativa commontrack_id' })
      };
    }

    const params = new URLSearchParams({ apikey: API_KEY });

    // track_isrc over commontrack_id, as recommended by Musixmatch API documentation  
    if (trackIsrc) params.append('track_isrc', trackIsrc);
    else if (commontrackId) params.append('commontrack_id', commontrackId);

    const response = await fetch(`${BASE_URL}/track.lyrics.get?${params}`);

    // parse JSON
    const raw = await response.json();

    // validate minimal structure
    if (!isTrackLyricsResponse(raw)) {
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'Invalid Musixmatch response structure' }),
      };
    }

    const data: TrackLyricsResponse = raw;

    // check Musixmatch status
    if (data.message.header.status_code !== 200) {
      return {
        statusCode: 502,
        body: JSON.stringify({
          error: `Musixmatch API error: ${data.message.header.status_code}`,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: message }),
    };
  }
};