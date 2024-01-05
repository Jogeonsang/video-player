import { styled } from "styled-components";

export const VideoControlsWrapper = styled.div`
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  box-sizing: border-box;
  flex-direction: column;
  gap: 10px;
  user-select: none;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1e1e1e;
  position: relative;
  border-radius: 5px;
  z-index: 1;
`;

export const CurrentProgress = styled.div<{ width?: number }>`
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  width: ${(props) => props.width}%;
  z-index: 2;
  max-width: 100%;
`;

export const ProgressBarWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 5px;
  border-radius: 5px;
  background-color: #1e1e1e;
  cursor: pointer;
`;
