import React from "react";
import styled, { useTheme } from "styled-components/native";
import { StyleSheet, View, TouchableWithoutFeedback, useColorScheme } from "react-native";
import { makeImgPath } from '../uitils';
import { BlurView } from 'expo-blur';
import Poster from "./Poster";
import Vote from "./Vote";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { Movie, TV } from "../type";

const Wrapper = styled.View`
flex-direction: row;
height: 100%;
justify-content: center;
align-items: center;
`

const Column = styled.View`
width: 50%;
padding: 20px;
`
const ImgBg = styled.Image``;

const Title = styled.Text`
font-size: 18px;
font-weight: 600;
color: white;
margin-bottom: 10px;
`;

const Overview = styled.Text`
color: rgba(255,255,255,0.6);
margin-bottom: 5px;
`;

const Rate = styled(Overview)``;

interface SlideProps {
  originalTitle: string;
  backdropPath: string;
  posterPath: string;
  voteAverage: number;
  overview: string;
  fulldata: Movie | TV;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
  fulldata
}) => {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack",
      {
        screen: "Detail",
        params: {
          ...fulldata
        }
      })
  }


  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={goToDetail} >
      <View style={{ flex: 1 }} >
        <ImgBg
          source={{ uri: makeImgPath(backdropPath) }}
          style={StyleSheet.absoluteFill} />
        <BlurView
          intensity={70}
          tint={isDark ? "dark" : "light"}
          style={StyleSheet.absoluteFill}>
          <Wrapper>
            <Poster posterPath={posterPath} />
            <Column>
              <Title>{originalTitle}</Title>
              <Vote voteAverage={voteAverage} />
              <Overview>
                {overview.length > 100 ? overview.substr(0, 100) + '...' : overview}
              </Overview>
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>


  )
}



export default Slide
