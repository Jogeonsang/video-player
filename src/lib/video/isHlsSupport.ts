import Hls from 'hls.js';

export function isHLSVideo(videoSrc: string): boolean {
  const isHlsExtension = videoSrc.endsWith('.m3u8');
  const isHlsSupported = Hls.isSupported();
  return isHlsExtension && isHlsSupported;
}
