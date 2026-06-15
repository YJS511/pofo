import { PortfolioState } from '../types';

const _hasCS =
  typeof CompressionStream !== 'undefined' && typeof DecompressionStream !== 'undefined';

function shareableState(state: PortfolioState): PortfolioState {
  const s: PortfolioState = JSON.parse(JSON.stringify(state));
  if (s.profile) s.profile.iconImg = '';
  if (s.theme) s.theme.coverImg = '';
  return s;
}

export async function gzipB64(str: string): Promise<string> {
  const plain =
    'j' +
    btoa(unescape(encodeURIComponent(str)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  if (plain.length <= 1800 || !_hasCS) return plain;
  const buf = await new Response(
    new Blob([str]).stream().pipeThrough(new CompressionStream('gzip'))
  ).arrayBuffer();
  let bin = '';
  const u8 = new Uint8Array(buf);
  for (let i = 0; i < u8.length; i++) bin += String.fromCharCode(u8[i]);
  const gz =
    'g' + btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return gz.length < plain.length ? gz : plain;
}

export async function gunzipB64(tok: string): Promise<string> {
  const tag = tok[0];
  const b64 = tok.slice(1).replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(b64);
  if (tag === 'j') return decodeURIComponent(escape(bin));
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  const buf = await new Response(
    new Blob([u8]).stream().pipeThrough(new DecompressionStream('gzip'))
  ).arrayBuffer();
  return new TextDecoder().decode(buf);
}

export async function buildShareURL(state: PortfolioState, base?: string): Promise<string> {
  const token = await gzipB64(JSON.stringify(shareableState(state)));
  const b = (base || location.origin + location.pathname).replace(/#.*$/, '');
  return b + '#p=' + token;
}

export function qrSrc(url: string): string {
  return (
    'https://api.qrserver.com/v1/create-qr-code/?size=560x560&margin=12&ecc=L&data=' +
    encodeURIComponent(url)
  );
}

export async function parseShareHash(): Promise<PortfolioState | null> {
  const h = location.hash || '';
  const m = h.match(/[#&]p=([^&]+)/);
  if (!m) return null;
  try {
    const json = await gunzipB64(m[1]);
    return JSON.parse(json) as PortfolioState;
  } catch {
    return null;
  }
}
