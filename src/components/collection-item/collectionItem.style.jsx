import styled from 'styled-components';

import CustomButton from '../custom-button/button';

export const ImageContainer = styled.div`
    width: 100%;
    height: 95%;
    background-size: cover;
    background-position: center;
    margin-bottom: 5px;
`;

export const CollectionFooterContainer = styled.div`
    height: 5%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
`;

export const CustomButtonContainer = styled(CustomButton)`
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 255px;
    display: none;
    border: none;
    outline: none;
`;


export const CollectionItemContainer = styled.div`
    width: 22vw;
    display: flex;
    flex-direction: column;
    height: 400px;
    align-items: center;
    position: relative;
    cursor: pointer;
    margin: 20px 10px 40px;

    &:hover ${CustomButtonContainer} {
        display: inline;
        opacity: 0.85;
    }

    &:hover ${ImageContainer} {
        opacity: 0.8;
    }
`;