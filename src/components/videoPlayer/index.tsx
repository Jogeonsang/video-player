import { useRef } from "react";
import * as S from "./style";
import VideoControls from "./VideoControls";
import useVideo from "./hooks/useVideo";

interface VideoPlayerProps {
  videoSrc: string;
}

function VideoPlayer({ videoSrc }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { duration, currentTime } = useVideo({ videoSrc, videoRef });

  return (
    <S.VideoWrapper>
      <S.Video ref={videoRef} controls autoPlay={false} muted={true} />
      <VideoControls videoRef={videoRef} duration={duration} currentTime={currentTime}/>
    </S.VideoWrapper>
  );
}

export default VideoPlayer;
