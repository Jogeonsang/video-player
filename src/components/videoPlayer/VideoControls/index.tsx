import React, { useRef, useState } from "react";
import * as S from "./style";
import { AiFillCaretRight } from "react-icons/ai";
import { AiOutlinePause } from "react-icons/ai";

interface VideoControlsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  duration: number;
  currentTime: number;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  videoRef,
  duration,
  currentTime,
}) => {
  const [dragProgress, setDragProgress] = useState<number | null>(null);
  const isDraggingRef = useRef(false);

  const handlePlay = () => {
    const video = videoRef.current;
    if (video && video.paused) video.play();
  };

  const handlePause = () => {
    const video = videoRef.current;
    if (video && !video.paused) video.pause();
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (video) video.volume = parseFloat(event.target.value);
  };

  const progressPercentage =
    ((videoRef?.current?.currentTime ?? 0) / duration) * 100;

  const handleProgressBarClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = event.target as HTMLDivElement;
    const bounds = target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const newTime = (x / bounds.width) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDraggingRef && videoRef.current) {
      const bounds = videoRef.current.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const newDragProgress = (x / bounds.width) * 100;
      setDragProgress(newDragProgress);
    }
  };
  const handleMouseUp = (event: MouseEvent) => {
    if (isDraggingRef && videoRef.current) {
      const bounds = videoRef.current.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const newTime = (x / bounds.width) * duration;
      videoRef.current.currentTime = newTime;
      console.log("handleMouseUp");
    }
    isDraggingRef.current = false;
    setDragProgress(null);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.log("handleMouseDown");

    isDraggingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <S.VideoControlsWrapper>
      <S.ProgressBarWrapper
        onMouseDown={handleMouseDown}
        onClick={handleProgressBarClick}
      >
        <S.CurrentProgress
          width={dragProgress !== null ? dragProgress : progressPercentage}
        />
      </S.ProgressBarWrapper>
      <div>
        <button onClick={handlePlay}>
          <AiFillCaretRight color="#fff" />
        </button>
        <button onClick={handlePause}>
          <AiOutlinePause color="#FFF" />
        </button>
        {/* <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        onChange={handleVolumeChange}
      /> */}
      </div>
    </S.VideoControlsWrapper>
  );
};

export default VideoControls;
