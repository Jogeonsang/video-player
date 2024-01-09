import { memo } from 'react';

import { BsFillVolumeDownFill, BsFillVolumeMuteFill } from 'react-icons/bs';

import * as S from './style';

interface Props {
  isMutted: boolean;
  volume: number;
  handleVolumeClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  volumeControlRef: React.RefObject<HTMLDivElement>;
  handleVolumeMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleToggleMute: () => void;
}
function VolumnControl({ isMutted, volume, handleVolumeClick, volumeControlRef, handleVolumeMouseDown, handleToggleMute }: Props) {
  return (
    <S.VolumeControlWrapper>
      <button onClick={handleToggleMute}>
        {isMutted ? <BsFillVolumeMuteFill {...iconStyle} /> : <BsFillVolumeDownFill {...iconStyle} />}
      </button>
      <S.VolumeDragSection ref={volumeControlRef} onMouseDown={handleVolumeMouseDown} onClick={handleVolumeClick}>
        <S.VolumeLevel width={volume * 100} isMutted={isMutted} />
      </S.VolumeDragSection>
    </S.VolumeControlWrapper>
  );
}

export default memo(VolumnControl);

const iconStyle = {
  color: '#fff',
  fontSize: 24,
};
