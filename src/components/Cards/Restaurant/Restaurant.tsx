import React from "react";
import { Rating } from "react-native-ratings";
import Status from "../../Status/Status";
import {
  Address,
  CoverImage,
  Info,
  RatingsContainer,
  RestaurantCard,
  Title,
} from "./Restaurant.styles";

interface RestaurantProps {
  name: string;
  photos: string[];
  address: string;
  isOpenNow: boolean;
  rating: number;
  isClosedTemporarily: boolean;
}

export const Restaurant: React.FC<RestaurantProps> = ({
  name,
  photos,
  address,
  isOpenNow,
  rating,
  // isClosedTemporarily,
}) => {
  let status;
  isOpenNow ? (status = "open") : (status = "closed");
  return (
    <RestaurantCard elevation={5}>
      <CoverImage key={name} source={{ uri: photos[0] }} />
      <RatingsContainer>
        <Title>{name}</Title>

        <Rating
          startingValue={rating}
          ratingCount={5}
          imageSize={30}
          readonly={true}
        />
      </RatingsContainer>
      <Info>
        <Status status={status} />
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};

export default Restaurant;