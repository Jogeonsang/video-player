import * as S from "./style";

interface VideoNavigationProps {
  videoList: string[];
  changeVideo: (video: string) => void;
}
function VideoNavigation({ videoList, changeVideo }: VideoNavigationProps) {
  return (
    <S.VideoNavigationContainer>
      <ul>
        {videoList.map((video) => (
          <S.StyledLi key={video}>
            <S.StyledButton onClick={() => changeVideo(video)}>
              Play {video}
            </S.StyledButton>
          </S.StyledLi>
        ))}
      </ul>
    </S.VideoNavigationContainer>
  );
}

export default VideoNavigation;
