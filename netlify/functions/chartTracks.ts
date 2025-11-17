import type { Handler } from '@netlify/functions';
import type { ChartTracksResponse } from '../../src/types/API.types';

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
      country,
      chart_name: 'mxmweekly',
      f_has_lyrics: '1',
      page: '1',
      page_size: '30'
    });

    const response = await fetch(`${BASE_URL}/chart.tracks.get?${params}`);
    const data: ChartTracksResponse = await response.json();

    if (data.message.header.status_code !== 200) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: `Musixmatch API error: ${data.message.header.status_code}` })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
   } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: message })
    };
  }
};
