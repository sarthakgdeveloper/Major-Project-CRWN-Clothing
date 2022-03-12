import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const optionContainer = css`
  text-decoration: none;
  padding: 0.7vw 0vw;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 1vw;
  display: flex;
`;

export const HeaderContainer = styled.div`
  height: 3vw;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2vw;
`;

export const LogoContainer = styled.div`
  height: 3vw;
  width: 50%;
  display: flex;
  align-items: center;
`;

export const Logo = styled(Link)`
  font-size: 28px;
  text-decoration: none;
`;

export const OptionsContainer = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const OptionLink = styled(Link)`
  ${optionContainer}
`;
export const OptionDiv = styled.div`
  ${optionContainer}
`;
