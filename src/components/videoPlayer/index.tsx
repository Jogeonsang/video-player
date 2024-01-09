import { useRef } from 'react';

import { VideoProvider } from './hooks/useVideoContext';
import * as S from './style';
import VideoControls from './VideoControls';

// videoSrc -> src로 변경

interface VideoPlayerProps {
  videoSrc: string;
}

function VideoPlayer({ videoSrc }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <VideoProvider videoRef={videoRef} videoSrc={videoSrc} containerRef={containerRef}>
      <S.VideoWrapper ref={containerRef}>
        <S.Video ref={videoRef} autoPlay={false} muted={true} />
        <VideoControls />
      </S.VideoWrapper>
    </VideoProvider>
  );
}

export default VideoPlayer;
