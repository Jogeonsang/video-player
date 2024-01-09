import { memo, useState } from 'react';

import { isHLSVideo } from 'lib/video/isHlsSupport';
import { BsGearFill } from 'react-icons/bs';
import { type QualityLevel } from 'types/video';

import Dropdown from './Dropdown';
import * as S from './style';

interface Props {
  videoSrc: string;
  qualityLevels: QualityLevel[];
  currentQualityLevelIndex: number;
  handleQualityChange: (levelIndex: number) => void;
}
function QualityControl({ videoSrc, qualityLevels, currentQualityLevelIndex, handleQualityChange: changeQuality }: Props) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleQualityChange = (levelIndex: number) => {
    changeQuality(levelIndex);
    setIsDropdownVisible(false);
  };

  return (
    <>
      {isHLSVideo(videoSrc) && (
        <S.QualitySelectButton onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
          <BsGearFill fontSize={24} color={'#fff'} />
          {isDropdownVisible && (
            <Dropdown value={qualityLevels[currentQualityLevelIndex]} options={qualityLevels} onChange={handleQualityChange} />
          )}
        </S.QualitySelectButton>
      )}
    </>
  );
}

export default memo(QualityControl);
