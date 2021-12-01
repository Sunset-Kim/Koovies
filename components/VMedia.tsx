import React from 'react'
import styled from 'styled-components/native';
import Vote from './Vote';
import Poster from './Poster';
import { MediaProps } from '../type';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Movie = styled.View`
  align-items: center;
`;

const Title = styled.Text`
margin: 5px 0;
font-weight: 600;
font-size: 15px;
color: ${props => props.theme.foregroundColor};
`
const VMedia: React.FC<MediaProps> = ({ posterPath, title, voteAverage, fullData }) => {

  const navigation = useNavigation();

  const goToDetail = () => {
    navigation.navigate("Stack",
      {
        screen: "Detail",
        params: {
          ...fullData
        }
      })
  }

  return (
    <TouchableOpacity onPress={goToDetail}>
      <Movie>
        <Poster posterPath={posterPath} />
        <Title>
          {title.slice(0, 8)}
          {title.length > 8 ? `...` : null}
        </Title>
        <Vote voteAverage={voteAverage} />
      </Movie>
    </TouchableOpacity>

  )
}

export default VMedia;
