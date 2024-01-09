import { useCallback, useEffect, useRef, useState } from 'react';

function useVideoVolumeControl(videoRef: React.RefObject<HTMLVideoElement>) {
  const [volume, setVolume] = useState(0);
  const [isMutted, setIsMutted] = useState(true);
  const isDraggingRef = useRef(false);
  const volumeControlRef = useRef<HTMLDivElement>(null);

  const handleToggleMute = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMutted(videoRef.current.muted);
      if (!video.muted && video.volume === 0) {
        video.volume = 0.5;
        setVolume(video.volume);
      }
    }
  }, []);

  const handleUpdateVolume = (clientX: number) => {
    const rect = volumeControlRef.current?.getBoundingClientRect();
    if (rect) {
      const newVolume = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      if (videoRef.current) {
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
      }
    }
  };

  const handleVolumeClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleUpdateVolume(event.clientX);
  }, []);

  const handleVolumeMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();

    isDraggingRef.current = true;
    handleUpdateVolume(event.clientX);
  }, []);

  const handleMouseMove = (event: MouseEvent) => {
    if (isDraggingRef.current) {
      handleUpdateVolume(event.clientX);
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    event.preventDefault();
    isDraggingRef.current = false;
  };

  useEffect(function eventListner() {
    const handleMouseMoveWrapper = (e: MouseEvent) => handleMouseMove(e);
    const handleMouseUpWrapper = (e: MouseEvent) => handleMouseUp(e);

    document.addEventListener('mousemove', handleMouseMoveWrapper);
    document.addEventListener('mouseup', handleMouseUpWrapper);

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveWrapper);
      document.removeEventListener('mouseup', handleMouseUpWrapper);
    };
  }, []);

  useEffect(
    function initVolume() {
      const video = videoRef.current;
      if (video) {
        setVolume(video.volume);
        setIsMutted(video.muted);
      }
    },
    [videoRef],
  );

  return {
    isMutted,
    volume,
    volumeControlRef,
    handleVolumeMouseDown,
    handleVolumeClick,
    handleUpdateVolume,
    handleToggleMute,
  };
}

export default useVideoVolumeControl;
