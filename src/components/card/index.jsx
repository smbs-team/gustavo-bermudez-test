import React from "react";
import styled from "styled-components";
import { BLACK_COLOR, GRAY_COLOR } from "../../constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

const CardContainer = styled.div`
  width: 250px;
  height: 300px;
  display: flex;
  flex-direction: column;
  margin-right: 15px;
  margin-bottom: 15px;
  border-radius: 50px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 60%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const CardTextContainer = styled.div`
  background-color: white;
  padding: 15px;
  flex: 1;
  color: ${GRAY_COLOR};
  font-weight: bolder;
  font-size: 1.5rem;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Card = ({
  imageUrl,
  text,
  isFavorite = false,
  onClick = () => null,
  onClickFavorite = () => null,
}) => {
  return (
    <CardContainer
      onClick={(evt) => {
        onClick();
      }}
    >
      <CardImage src={imageUrl} alt="card" />
      <CardTextContainer>
        <div>{text}</div>

        <FontAwesomeIcon
          onClick={(evt) => {
            evt.stopPropagation();
            onClickFavorite();
          }}
          role="button"
          icon={isFavorite ? faStarSolid : faStarRegular}
        />
      </CardTextContainer>
    </CardContainer>
  );
};

export default Card;
