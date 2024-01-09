import { useState } from 'react';

import VideoPlayer from '~components/VideoPlayer';
import VideoNavigation from '~features/Home/VideoNavigation';
import * as S from '~styles/Home';

const videoList = [
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  'https://storage.googleapis.com/bepro-server-storage/videos/tmp/stitching/69598-012400/playlist.m3u8',
  'https://storage.googleapis.com/bepro-server-storage/videos/stitching/2022-09-21/69598-012400.mp4',
];

function App() {
  const [selectVideo, setSelectVideo] = useState(videoList[0]);
  return (
    <S.Home>
      <S.VideoWrapper>
        <VideoPlayer videoSrc={selectVideo} />
      </S.VideoWrapper>
      <VideoNavigation videoList={videoList} changeVideo={(newVideo) => setSelectVideo(newVideo)} />
    </S.Home>
  );
}

export default App;
