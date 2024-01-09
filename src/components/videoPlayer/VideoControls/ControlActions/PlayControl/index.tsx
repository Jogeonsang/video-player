import { memo } from 'react';

import { AiFillCaretRight, AiOutlinePause } from 'react-icons/ai';

const iconStyle = {
  color: '#fff',
  fontSize: 24,
};

interface Props {
  isPlaying: boolean;
  handleTogglePlayPause: () => void;
}
function PlayControl({ isPlaying, handleTogglePlayPause }: Props) {
  return (
    <button onClick={handleTogglePlayPause}>{isPlaying ? <AiOutlinePause {...iconStyle} /> : <AiFillCaretRight {...iconStyle} />}</button>
  );
}

export default memo(PlayControl);
