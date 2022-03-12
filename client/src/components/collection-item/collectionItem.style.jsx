import styled from "styled-components";

import CustomButton from "../custom-button/button";

let change;

if (window.innerWidth <= 600) {
  change = true;
} else {
  change = false;
}

export const ImageContainer = styled.div`
  width: 100%;
  height: 95%;
  background-size: cover;
  background-position: center;
  margin-bottom: 0.5vw;
  position: relative;
`;

export const ImageShifter = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  z-index: 2;
`;

export const ImagesSpan = styled.span`
  color: #fff;
  height: 2rem;
  width: 2rem;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  font-size: 1.5rem;
  cursor: pointer;
  user-select: none;
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
  z-index: 1;
`;

export const CollectionItemContainer = styled.div`
  width: 20vw;
  display: flex;
  flex-direction: column;
  height: 25vw;
  align-items: center;
  position: relative;
  cursor: pointer;
  margin: 2.5vw 0.7vw 1vw;
  ${change
    ? `& ${CustomButtonContainer} {
        display: inline;
    }`
    : `
    &:hover ${CustomButtonContainer} {
        display: inline;
    }
    `};
`;
