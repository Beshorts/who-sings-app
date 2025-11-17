import type { Handler } from '@netlify/functions';
import type { ChartTracksResponse } from '../../src/types/API.types';

/** REQUIRED BY NETLIFY PLATFORM TO VALIDATE THE RESPONSE
 * Type guard that validates if a JSON payload matches ChartTracksResponse.
 * Ensures:
 * - payload is an object
 * - contains a "message" object
 * - contains a "header" object inside message
 * - contains a numeric "status_code"
 */
function isChartTracksResponse(raw: unknown): raw is ChartTracksResponse {
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
 * Netlify Function to fetch chart tracks from Musixmatch API.
 *
 * - Handles the API request in a serverless environment to keep the API key hidden.
 * - Bypasses Musixmatch CORS restrictions.
 *
 * Fetches API data using mixed parameters.
 * - @params country (optional, default: 'IT'): the country code for the chart. Provided by the user input.
 *
 * Static Parameters
 * - @params chart_name: mxmweekly (most viewed lyrics in the last 7 days),
 * - @params f_has_lyrics: 1 (get only track with lyrics),
 * - @params page: 1 (get only 1° page),
 * - @params page_size: 30 (fixed result limit)
 * 
 * Returns:
 * - JSON containing the list of tracks with the most viewed lyrics in the last 7 days.
 * - Returns HTTP 500 if the Musixmatch API returns an error.
 */

// small ambient declaration for process.env at the top
// so TypeScript knows about process and the key. 
declare const process: { env: { MUSIXMATCH_KEY?: string; MUSIXMATCH_BASE_URL: string }; };
const API_KEY = process.env.MUSIXMATCH_KEY;
const BASE_URL = process.env.MUSIXMATCH_BASE_URL;

// make sure the API key is defined
if (!API_KEY) {
  throw new Error('MUSIXMATCH_KEY non trovata');
}

export const handler: Handler = async (event) => {
  try {
    const country = event.queryStringParameters?.country || 'IT';

    const params = new URLSearchParams({
      apikey: API_KEY,
      country, //value from user input
      chart_name: 'mxmweekly',
      f_has_lyrics: '1',
      page: '1',
      page_size: '30'
    });

    const response = await fetch(`${BASE_URL}/chart.tracks.get?${params}`);

    // Parse JSON safely
    const raw = await response.json();

    // Validate structure using type guard
    if (!isChartTracksResponse(raw)) {
      throw new Error('Invalid Musixmatch response structure');
    }

    const data = raw;

    // Check Musixmatch response code
    if (data.message.header.status_code !== 200) {
      return {
        statusCode: 502,
        body: JSON.stringify({
          error: `Musixmatch API error: ${data.message.header.status_code}`,
        }),
      };
    }

    // OK
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