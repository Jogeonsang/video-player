import { memo } from 'react';

import { BsFullscreen, BsFullscreenExit } from 'react-icons/bs';

interface Props {
  handleToggleFullScreen: () => void;
  isFullScreen: boolean;
}
function ScreenControl({ handleToggleFullScreen, isFullScreen }: Props) {
  return (
    <button onClick={handleToggleFullScreen}>{isFullScreen ? <BsFullscreenExit {...iconStyle} /> : <BsFullscreen {...iconStyle} />}</button>
  );
}

export default memo(ScreenControl);

const iconStyle = {
  color: '#fff',
  fontSize: 24,
};
