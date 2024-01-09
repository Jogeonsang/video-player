import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { useVideoContext } from '../hooks/useVideoContext';
import PlayControl from './ControlActions/PlayControl';
import QualityControl from './ControlActions/QualityContorl';
import ScreenControl from './ControlActions/ScreenControl';
import VolumnControl from './ControlActions/VolumnControl';
import SeekControl from './SeekControl';
import * as S from './style';

function VideoControls() {
  const {
    isLoading,
    isPlaying,
    isMutted,
    isFullScreen,
    volume,
    volumeControlRef,
    videoSrc,
    qualityLevels,
    currentQualityLevelIndex,
    handleTogglePlayPause,
    handleVolumeClick,
    handleVolumeMouseDown,
    handleToggleMute,
    handleToggleFullScreen,
    handleQualityChange,
  } = useVideoContext();

  return (
    <>
      {isLoading && (
        <S.Loading>
          <AiOutlineLoading3Quarters fontSize={38} color="#FFF" />
        </S.Loading>
      )}
      <S.VideoControlsWrapper>
        <SeekControl />
        <S.ControlsGroup>
          <S.ControlsActionLeft>
            <PlayControl isPlaying={isPlaying} handleTogglePlayPause={handleTogglePlayPause} />
            <VolumnControl
              isMutted={isMutted}
              volume={volume}
              handleVolumeClick={handleVolumeClick}
              volumeControlRef={volumeControlRef}
              handleVolumeMouseDown={handleVolumeMouseDown}
              handleToggleMute={handleToggleMute}
            />
          </S.ControlsActionLeft>
          <S.ControlsActionRight>
            <ScreenControl isFullScreen={isFullScreen} handleToggleFullScreen={handleToggleFullScreen} />
            <QualityControl
              videoSrc={videoSrc}
              qualityLevels={qualityLevels}
              currentQualityLevelIndex={currentQualityLevelIndex}
              handleQualityChange={handleQualityChange}
            />
          </S.ControlsActionRight>
        </S.ControlsGroup>
      </S.VideoControlsWrapper>
    </>
  );
}

export default VideoControls;
