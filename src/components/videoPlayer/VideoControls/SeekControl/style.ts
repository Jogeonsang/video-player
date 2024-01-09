import { styled } from 'styled-components';

export const Seek = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1e1e1e;
  position: relative;
  z-index: 1;
`;

export const CurrentProgress = styled.div<{ width?: number }>`
  height: 100%;
  background-color: #fff;
  width: ${(props) => props.width}%;
  z-index: 2;
  max-width: 100%;
`;
export const SeekHandle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #fff;
  margin-left: -5px;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

export const SeekWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  height: 5px;
  border-radius: 5px;
  background-color: #1e1e1e;
  cursor: pointer;

  &:hover ${SeekHandle} {
    opacity: 1;
  }
`;
