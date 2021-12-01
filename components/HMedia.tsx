import React from 'react';
import styled from 'styled-components/native';
import { MediaProps } from '../type';
import Poster from './Poster';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

const HMovie = styled.View`
  flex-direction: row;
  padding-horizontal: 20px;
`;

const HColumn = styled.View`
  margin-left: 15px;
  flex: 1;
`
const TitleHeader = styled.View`
  margin-bottom: 10px;
`;

const Title = styled.Text`
margin-vertical: 5px;
font-weight: 600;
font-size: 15px;
color: ${props => props.theme.foregroundColor};
`
const ReleaseDate = styled.Text`
color: ${props => props.theme.foregroundColor};
`;
const Overview = styled.Text`
color: ${props => props.theme.foregroundColor};
opacity: 0.8;
margin-bottom: 10px;
`;

const MoreBtn = styled.TouchableOpacity`

width: 35%;
border-radius: 5px;
padding: 5px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.primary};
`;

const MoreBtnText = styled.Text`
  font-weight: 600;
  color: ${props => props.theme.foregroundColor};
`;

const HMedia: React.FC<MediaProps> = ({ posterPath, title, overview, releaseDate, fullData }) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    //@ts-ignore
    navigation.navigate("Stack",
      {
        screen: "Detail",
        params: {
          ...fullData
        }
      })
  }

  return (
    <HMovie>
      <Poster posterPath={posterPath ?? null} />
      <HColumn>
        <TitleHeader>
          <Title>
            {title.slice(0, 14)}
            {title.length > 14 ? `...` : null}
          </Title>
          <ReleaseDate>
            {
              dayjs(releaseDate).locale('ko').format('YY년 MM월 DD일')
            }
          </ReleaseDate>
        </TitleHeader>

        <Overview>
          {
            overview && overview.length > 140 ?
              overview.substr(0, 140) + '...' :
              overview
          }
        </Overview>
        <MoreBtn onPress={goToDetail}>
          <MoreBtnText>
            View more
          </MoreBtnText>
        </MoreBtn>



      </HColumn>
    </HMovie>


  )

};

export default HMedia;
