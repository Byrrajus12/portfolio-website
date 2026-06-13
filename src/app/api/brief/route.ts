import { NextRequest, NextResponse } from 'next/server';
import { getMode } from '@/lib/brief-modes';

export const runtime = 'nodejs';

const FACTS = `
Facts about Sai Byrraju (use only these, never invent):
- Software engineer working across AI products, agent infrastructure, backend systems, operational tooling.
- Currently at Zymo Solutions: backend services and voice agents for restaurant automation, Welbilt IoT kitchen devices (Convotherm ovens, Merrychef units).
- Previously sole engineer on Voysly at 7C Lingo: production Voice AI interviewing platform, 3,000+ interviews, 16+ client locations, cut voice latency from 1340ms to 850ms.
- Built VoiceOps at a hackathon: AI SRE agent that calls the on-call engineer, gets verbal approval, runs remediation.
- B.S. Computer Science, Michigan State University, Dec 2024.
- Stack: OpenAI Realtime, Vapi, Next.js, FastAPI, PostgreSQL, AWS, WebRTC.
- Based in East Lansing, Michigan; always building something and open to interesting problems and good people.`;

// Sai's fixed context for the greeting
const SAI_TZ = 'America/Detroit';
const SAI_LAT = 42.737;
const SAI_LON = -84.4839;

// In-memory cache + rate limit (per server instance; resets on redeploy, which is fine)
const cache = new Map<string, { text: string; expires: number }>();
const CACHE_TTL = 30 * 60 * 1000; // 30min — keeps the weather flourish reasonably fresh
let windowStart = Date.now();
let windowCount = 0;
const RATE_LIMIT = 30; // generations per hour, global

// Weather is cached separately, ~30min per region (rounded coords)
const weatherCache = new Map<string, { phrase: string | null; expires: number }>();
const WEATHER_TTL = 30 * 60 * 1000;

function dayPart(hour: number): string {
  if (hour < 5) return 'late night';
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  if (hour < 21) return 'evening';
  return 'night';
}

function fmtHour(hour: number): string {
  const ampm = hour < 12 ? 'am' : 'pm';
  const hr = hour % 12 === 0 ? 12 : hour % 12;
  return `${hr}${ampm}`;
}

function hourInTz(tz: string): number {
  const s = new Date().toLocaleString('en-US', { timeZone: tz, hour: 'numeric', hour12: false });
  const n = parseInt(s, 10);
  return Number.isNaN(n) ? 12 : n % 24;
}

// WMO weather code → short, plain phrase
function describeWeather(code: number): string {
  if (code === 0) return 'clear and sunny';
  if (code === 1) return 'mostly clear';
  if (code === 2) return 'partly cloudy';
  if (code === 3) return 'overcast';
  if (code === 45 || code === 48) return 'foggy';
  if (code >= 51 && code <= 57) return 'drizzly';
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return 'rainy';
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snowy';
  if (code >= 95) return 'stormy';
  return 'mild';
}

// Open-Meteo current weather — free, keyless. Cached ~30min per rounded coords.
// Returns a phrase like "overcast and around 54°F", or null on any failure.
async function getWeather(lat: number, lon: number): Promise<string | null> {
  if (Number.isNaN(lat) || Number.isNaN(lon)) return null;
  const key = `${lat.toFixed(1)},${lon.toFixed(1)}`;
  const hit = weatherCache.get(key);
  if (hit && hit.expires > Date.now()) return hit.phrase;

  let phrase: string | null = null;
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,weather_code&temperature_unit=fahrenheit`;
    const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (res.ok) {
      const data = await res.json();
      const code = data?.current?.weather_code;
      const temp = data?.current?.temperature_2m;
      if (typeof code === 'number' && typeof temp === 'number') {
        phrase = `${describeWeather(code)} and around ${Math.round(temp)}°F`;
      }
    }
  } catch {
    phrase = null;
  }
  weatherCache.set(key, { phrase, expires: Date.now() + WEATHER_TTL });
  return phrase;
}

export async function GET(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'unconfigured' }, { status: 503 });
  }

  const params = req.nextUrl.searchParams;
  const mode = getMode(params.get('mode') ?? 'default');
  if (!mode) {
    return NextResponse.json({ error: 'bad mode' }, { status: 400 });
  }
  const visHour = Math.min(23, Math.max(0, parseInt(params.get('hour') ?? '12', 10) || 12));

  // Rough visitor location + coordinates from edge/proxy headers when present
  const h = (name: string) => req.headers.get(name) ?? '';
  const safeDecode = (s: string) => {
    try { return decodeURIComponent(s); } catch { return s; }
  };
  let city = safeDecode(h('x-vercel-ip-city'));
  let region = h('x-vercel-ip-country-region');
  let country = h('x-vercel-ip-country');
  let lat = parseFloat(h('x-vercel-ip-latitude'));
  let lon = parseFloat(h('x-vercel-ip-longitude'));

  // Dev override (localhost has no geo headers). Gated to non-production unless
  // explicitly enabled, so prod requests can't spoof geo and poison the cache.
  // Drive the real UI in dev with env BRIEF_DEV_GEO="City,Region,Country,lat,lon";
  // or hit the API directly with ?city=&region=&country=&lat=&lon= query params.
  const allowDev = process.env.NODE_ENV !== 'production' || process.env.BRIEF_ALLOW_DEV_GEO === '1';
  if (allowDev) {
    if (!city && process.env.BRIEF_DEV_GEO) {
      const [c, r, co, la, lo] = process.env.BRIEF_DEV_GEO.split(',').map(s => s.trim());
      city = c ?? '';
      region = r ?? '';
      country = co ?? '';
      lat = la ? parseFloat(la) : NaN;
      lon = lo ? parseFloat(lo) : NaN;
    }
    // Explicit query params always win, for manual curl testing
    if (params.get('city') !== null) city = params.get('city') ?? '';
    if (params.get('region') !== null) region = params.get('region') ?? '';
    if (params.get('country') !== null) country = params.get('country') ?? '';
    if (params.get('lat') !== null) lat = parseFloat(params.get('lat') ?? '');
    if (params.get('lon') !== null) lon = parseFloat(params.get('lon') ?? '');
  }

  const place = city || region || country || '';

  // Cache: region + daypart granularity for the brief itself; global rate cap below
  const key = `${mode.id}|${dayPart(visHour)}|${place || 'unknown'}`;
  const hit = cache.get(key);
  if (hit && hit.expires > Date.now()) {
    return NextResponse.json({ text: hit.text, cached: true });
  }

  // Global hourly rate limit
  if (Date.now() - windowStart > 60 * 60 * 1000) {
    windowStart = Date.now();
    windowCount = 0;
  }
  if (windowCount >= RATE_LIMIT) {
    return NextResponse.json({ error: 'rate limited' }, { status: 429 });
  }
  windowCount++;

  // Technical mode opens clean — skip the weather flourish entirely
  const wantsFlourish = mode.id !== 'technical';

  const saiHour = hourInTz(SAI_TZ);
  const [saiWeather, visWeather] = await Promise.all([
    wantsFlourish ? getWeather(SAI_LAT, SAI_LON) : Promise.resolve(null),
    wantsFlourish ? getWeather(lat, lon) : Promise.resolve(null),
  ]);

  let context = `Grounding context for the greeting (weave in naturally, never list it):\n`;
  context += `- Sai is at his desk in East Lansing, Michigan (Eastern Time); his local time is about ${fmtHour(saiHour)} (${dayPart(saiHour)})`;
  if (saiWeather) context += `, and it's ${saiWeather} there`;
  context += `.\n`;
  if (place) {
    context += `- The visitor is browsing from around ${place}; their local time is about ${fmtHour(visHour)} (${dayPart(visHour)})`;
    if (visWeather) context += `, and it's ${visWeather} there`;
    context += `.\n`;
  } else {
    context += `- The visitor's location is unknown — do not guess or name any place for them; open only from Sai's own side.\n`;
  }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 320,
        messages: [
          {
            role: 'user',
            content: `You write the About brief on Sai Byrraju's portfolio site, in Sai's voice.\n${FACTS}\n\n${context}\n${mode.prompt}\n\nReply with the brief text only, no preamble, no quotes.`,
          },
        ],
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'upstream' }, { status: 502 });
    }

    const data = await res.json();
    const text: string = data?.content?.[0]?.text?.trim();
    if (!text) {
      return NextResponse.json({ error: 'empty' }, { status: 502 });
    }

    cache.set(key, { text, expires: Date.now() + CACHE_TTL });
    return NextResponse.json({ text, cached: false });
  } catch {
    return NextResponse.json({ error: 'failed' }, { status: 502 });
  }
}
