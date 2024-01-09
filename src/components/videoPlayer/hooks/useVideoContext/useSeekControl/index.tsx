import { useRef, useState } from 'react';

function useSeekControl(videoRef: React.RefObject<HTMLVideoElement>) {
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [dragProgress, setDragProgress] = useState<number | null>(null);
  const isDraggingRef = useRef(false);

  const handleDurationChange = () => {
    setDuration(videoRef.current?.duration || 0);
  };

  const handleCurrentTimeChange = () => {
    setCurrentTime(videoRef.current?.currentTime || 0);
  };

  const handleSeekClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDraggingRef.current) {
      return true;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const newTime = (x / bounds.width) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDraggingRef.current && videoRef.current) {
      const bounds = videoRef.current.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const newDragProgress = (x / bounds.width) * 100;
      setDragProgress(newDragProgress);
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    if (isDraggingRef.current && videoRef.current) {
      const bounds = videoRef.current.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const newTime = (x / bounds.width) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
    isDraggingRef.current = false;
    setDragProgress(null);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleSeekMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();

    isDraggingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return {
    duration,
    currentTime,
    handleDurationChange,
    handleCurrentTimeChange,
    dragProgress,
    handleSeekMouseDown,
    handleSeekClick,
  };
}

export default useSeekControl;
