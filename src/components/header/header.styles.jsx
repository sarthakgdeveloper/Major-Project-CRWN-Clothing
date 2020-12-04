import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom'; 
 
const optionContainer = css`
    text-decoration: none;
    padding: 10px 15px;
    cursor: pointer;
    text-transform: uppercase;
`

export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`;

export const LogoContainer = styled.div`
    height: 100%;
    width: 70px;
    align-items: center;
`;

export const Logo = styled(Link)`
    text-decoration: none;  
`;

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

export const OptionLink = styled(Link)`
 ${optionContainer}
`;
export const OptionDiv = styled.div`
 ${optionContainer}
`;