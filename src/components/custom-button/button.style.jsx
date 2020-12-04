import styled, {css} from 'styled-components';

const basicCustomButton = css`
    background-color: black;
    color: #fff;
    border: none;

    &:hover{
        background-color: #fff;
        color: #000;
        border: 1px solid #000;
    }
`;
const invertedCustomButton = css`
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
        
    &:hover{
        background-color: black;
        color: #fff;
        border: none;
    }
`;
const googleCustomButton = css`
    background-color: #4285f4;
    color: #fff;
    border: none;

    &:hover{
        background-color: #357ae8;
        color: #fff;
        border: none;
    }
`;

const buttonChecker = props => {
    if (props.isGoogleSignIn) {
        return googleCustomButton;
    }

    return props.inverted ? invertedCustomButton : basicCustomButton;
}

export const CustomButtonContainer = styled.button`
    min-width: 165px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 15px;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: center;

    ${buttonChecker}
`