import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../uitils";

interface PosterProps {
  posterPath: string | null
}

const Image = styled.Image`
width: 100px;
height: 180px;
border-radius: 5px;
background-color: gray;
`;

const Poster: React.FC<PosterProps> = ({ posterPath }) => {
  return <Image source={{ uri: posterPath ? makeImgPath(posterPath) : "" }} />
}

export default Poster;