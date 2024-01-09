import { styled } from 'styled-components';

export const QualitySelectorWrapper = styled.ul`
  position: absolute;
  bottom: 40px;
  width: 80px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: left;
  padding: 0.5rem;
  flex-direction: column;
  gap: 10px;
  user-select: none;
`;

export const QualitySelectorItem = styled.li`
  display: flex;
  gap: 4px;
  color: #fff;
  border-radius: 5px;
  padding: 8px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;
