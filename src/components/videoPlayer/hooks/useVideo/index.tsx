import Hls from "hls.js";
import { useEffect, useState } from "react";

interface VideoProps {
  videoSrc: string;
  videoRef: React.RefObject<HTMLVideoElement>;
}

function useVideo({ videoSrc, videoRef }: VideoProps) {
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    let hls: Hls;

    const onLoadedMetadata = () => {
      if (video) {
        setDuration(video.duration || 0);
      }
    };

    const handleTimeUpdate = () => {
      if (video) {
        setCurrentTime(video.currentTime);
      }
    };

    if (video) {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch((e) => console.error("Error playing video:", e));
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoSrc;
      }

      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("loadedmetadata", onLoadedMetadata);
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
      if (video) {
        video.removeEventListener("loadedmetadata", onLoadedMetadata);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [videoSrc, videoRef]);

  return { duration, currentTime };
}

export default useVideo;
