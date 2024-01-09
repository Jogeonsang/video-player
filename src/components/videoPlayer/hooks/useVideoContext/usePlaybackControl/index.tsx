import { useCallback, useState } from 'react';

import type Hls from 'hls.js';
import type { QualityLevel } from 'types/video';

interface PlaybackControlProps {
  hlsRef: React.RefObject<Hls | null>;
  videoRef: React.RefObject<HTMLVideoElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}

export type PlaybackControlState = {
  qualityLevels: QualityLevel[];
  currentQualityLevelIndex: number;
  isFullScreen: boolean;
  isPlaying: boolean;
};
function usePlaybackControl({ hlsRef, videoRef, containerRef }: PlaybackControlProps) {
  const [qualityLevels, setQualityLevels] = useState<QualityLevel[]>([]);
  const [currentQualityLevelIndex, setCurrentQualityLevelIndex] = useState<number>(-1);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleQualityChange = useCallback((levelIndex: number) => {
    const hls = hlsRef.current;
    if (levelIndex === currentQualityLevelIndex) return null;

    if (hls) {
      hls.currentLevel = levelIndex;
      setCurrentQualityLevelIndex(levelIndex);
    }
  }, []);

  const handleTogglePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  }, []);

  const handleToggleFullScreen = useCallback(() => {
    if (containerRef?.current) {
      if (!document.fullscreenElement) {
        setIsFullScreen(true);
        containerRef.current.requestFullscreen().catch((err) => {
          alert(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      } else if (document.fullscreenElement === containerRef.current) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  }, []);

  return {
    qualityLevels,
    currentQualityLevelIndex,
    isFullScreen,
    isPlaying,
    handleQualityChange,
    setQualityLevels,
    setIsPlaying,
    setCurrentQualityLevelIndex,
    handleTogglePlayPause,
    handleToggleFullScreen,
  };
}

export default usePlaybackControl;
