import { BsCheck2 } from 'react-icons/bs';
import { type QualityLevel } from 'types/video';

import * as S from './style';

interface DropdownProps {
  value: QualityLevel;
  options: QualityLevel[];
  onChange: (levelIndex: number) => void;
}

function Dropdown({ value, options, onChange: handleChange }: DropdownProps) {
  return (
    <S.QualitySelectorWrapper>
      {options.map((option, index) => (
        <S.QualitySelectorItem key={option.height} onClick={() => handleChange(index)}>
          {value.height === option.height && <BsCheck2 color="#fff" />}
          <span>{option.height}</span>
        </S.QualitySelectorItem>
      ))}
    </S.QualitySelectorWrapper>
  );
}

export default Dropdown;
