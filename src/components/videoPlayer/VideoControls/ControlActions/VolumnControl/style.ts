import { styled } from 'styled-components';

export const VolumeControlWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;
`;

export const VolumeDragSection = styled.div`
  width: 100px;
  height: 5px;
  position: relative;
  background-color: #1e1e1e;
  border-radius: 5px;
`;

export const VolumeLevel = styled.div<{ width: number; isMutted: boolean }>`
  height: 100%;
  background-color: ${(props) => (props.isMutted ? '#B8B4BF' : '#fff')};
  width: ${(props) => props.width}%;
  border-radius: 5px;
`;
