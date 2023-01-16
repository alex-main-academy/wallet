import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 23px;
  font-size: 18px;
  color: var(--primary-text-color);
  font-weight: 400;

  &.active {
    font-weight: 700;
  }

  &.active svg {
    filter: drop-shadow(0px 3px 10px rgba(74, 86, 226, 0.5));
    fill: rgba(74, 86, 226, 1);
  }

  & svg {
    fill: rgba(110, 120, 232, 1);
    background-color: rgb(255, 255, 255);
    border-radius: 6px;
  }
`;
