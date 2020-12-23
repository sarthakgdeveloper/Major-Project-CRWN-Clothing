import styled from 'styled-components';

import CustomButton from '../custom-button/button';

export const ImageContainer = styled.div`
    width: 100%;
    height: 95%;
    background-size: cover;
    background-position: center;
    margin-bottom: .5vw;
`;

export const CollectionFooterContainer = styled.div`
    height: 5%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 1vw;
`;

export const CustomButtonContainer = styled(CustomButton)`
    width: 3vw;
    height: 3vw;
    opacity: 0.7;
    position: absolute;
    top: 18vw;
    display: none;
    border: none;
    outline: none;
`;


export const CollectionItemContainer = styled.div`
    width: 20vw;
    display: flex;
    flex-direction: column;
    height: 25vw;
    align-items: center;
    position: relative;
    cursor: pointer;
    margin: 2.5vw .7vw 1vw;

    &:hover ${CustomButtonContainer} {
        display: inline;
        opacity: 0.85;
    }

    &:hover ${ImageContainer} {
        opacity: 0.8;
    }
`;