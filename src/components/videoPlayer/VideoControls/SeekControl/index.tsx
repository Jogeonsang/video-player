import { useVideoContext } from '~components/VideoPlayer/hooks/useVideoContext';

import * as S from './style';

function SeekControl() {
  //TODO: Progress -> Seek 네이밍 변경
  const { currentTime, duration, dragProgress, handleSeekMouseDown, handleSeekClick } = useVideoContext();

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <S.SeekWrapper onMouseDown={handleSeekMouseDown} onClick={handleSeekClick}>
      <S.CurrentProgress width={dragProgress !== null ? dragProgress : progressPercentage} />
      <S.SeekHandle />
    </S.SeekWrapper>
  );
}

export default SeekControl;
