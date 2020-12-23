import styled, {css} from 'styled-components';

const basicCustomButton = css`
    background-color: black;
    color: #fff;
    border: none;

    &:hover{
        background-color: #fff;
        color: #000;
        border: .3px solid #000;
    }
`;
const invertedCustomButton = css`
    background-color: #fff;
    color: #000;
    border: .3px solid #000;
        
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
    min-width: 10vw;
    width: auto;
    height: 2vw;
    letter-spacing: 0.5px;
    line-height: 2vw;
    padding: 0 1.5vw 0 1.5vw;
    font-size: 1vw;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: center;

    ${buttonChecker}
`