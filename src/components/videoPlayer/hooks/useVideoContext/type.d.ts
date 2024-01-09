import type usePlaybackControl from './usePlaybackControl';
import type useSeekControl from './useSeekControl';
import type useVideoVolumeControl from './useVideoVolumeControl';

export type ContextVolumnControlState = ReturnType<typeof useVideoVolumeControl>;
export type ContextSeekControlState = Omit<ReturnType<typeof useSeekControl>, 'handleDurationChange' | 'handleCurrentTimeChange'>;
export type ContextPlaybackControlState = Omit<
  ReturnType<typeof usePlaybackControl>,
  'setCurrentQualityLevelIndex' | 'setQualityLevels' | 'setIsPlaying'
>;
