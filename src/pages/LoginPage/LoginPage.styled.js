import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
export const StyledLink = styled(NavLink)`
  width: 299px;
  height: 50px;
  align-self: center;
  border-radius: 20px;
  border: 1px solid #4a56e2;
  color: #4a56e2;
  background-color: transparent;
  text-transform: uppercase;
  font-family: var(--primary-font);
  letter-spacing: 0.1em;
  font-size: 18px;
  line-height: 1.5;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 767px) {
    width: 280px;
  }
`;
