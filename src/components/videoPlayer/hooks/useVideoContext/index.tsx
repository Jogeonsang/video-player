import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

import Hls from 'hls.js';
import { isHLSVideo } from 'lib/video/isHlsSupport';

import type { ContextPlaybackControlState, ContextSeekControlState, ContextVolumnControlState } from './type';
import useKeydownEvent from './useKeydownEvent';
import usePlaybackControl from './usePlaybackControl';
import useSeekControl from './useSeekControl';
import useVideoVolumeControl from './useVideoVolumeControl';

interface VideoContextProps {
  videoSrc: string;
  children: React.ReactNode;
  videoRef: React.RefObject<HTMLVideoElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}

interface VideoContextState extends ContextPlaybackControlState, ContextSeekControlState, ContextVolumnControlState {
  videoSrc: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
}

const VideoContext = createContext<VideoContextState | undefined>(undefined);

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideoContext must be used within a VideoProvider');
  }
  return context;
};

export const VideoProvider: React.FC<VideoContextProps> = ({ children, videoSrc, videoRef, containerRef }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const hlsRef = useRef<Hls | null>(null);

  const volumeControl = useVideoVolumeControl(videoRef);
  const { handleCurrentTimeChange, handleDurationChange, ...seekControl } = useSeekControl(videoRef);
  const { setCurrentQualityLevelIndex, setQualityLevels, setIsPlaying, ...playbackControl } = usePlaybackControl({
    hlsRef,
    videoRef,
    containerRef,
  });

  const keyDownMapper: Record<string, VoidFunction> = {
    Enter: playbackControl.handleToggleFullScreen,
    ' ': playbackControl.handleTogglePlayPause,
    m: volumeControl.handleToggleMute,
  };

  useKeydownEvent({ keyDownMapper });

  useEffect(
    function hlsSetup() {
      let hls: Hls;
      const video = videoRef.current;
      if (video) {
        video.addEventListener('timeupdate', handleCurrentTimeChange);
        video.addEventListener('loadedmetadata', handleDurationChange);

        if (isHLSVideo(videoSrc)) {
          hls = new Hls();
          hlsRef.current = hls;
          hls.loadSource(videoSrc);
          hls.attachMedia(video);
          setIsPlaying(true);

          hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
            setQualityLevels(data.levels.map((level) => ({ height: level.height })));

            video.play().catch((e) => console.error('Error playing video:', e));
          });

          hls.on(Hls.Events.LEVEL_SWITCHING, () => {
            setIsLoading(true);
          });

          hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
            setCurrentQualityLevelIndex(data.level);
            setIsLoading(false);
          });
        } else {
          video.src = videoSrc;
          video.load();

          setIsPlaying(false);
        }
      }

      return () => {
        if (hls) {
          hls.destroy();
        }
        if (video) {
          video.removeEventListener('loadedmetadata', handleDurationChange);
          video.removeEventListener('timeupdate', handleCurrentTimeChange);
        }
      };
    },
    [videoSrc, videoRef],
  );

  const value = {
    videoRef,
    containerRef,
    videoSrc,
    isLoading,
    ...playbackControl,
    ...volumeControl,
    ...seekControl,
  };

  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
};
