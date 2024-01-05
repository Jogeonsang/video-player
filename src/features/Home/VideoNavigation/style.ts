import { styled } from "styled-components";

export const VideoNavigationContainer = styled.nav`
  border-left: 1px solid rgba(40, 40, 40, 0.7);
  width: 400px;
  height: 100%;
  background-color: #141414;
`;

export const StyledUl = styled.ul``;

export const StyledLi = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: rgba(40, 40, 40, 0.7);
    button {
    }
  }
`;

export const StyledButton = styled.button`
  color: white;
`;
