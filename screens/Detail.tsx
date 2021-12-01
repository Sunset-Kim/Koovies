
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, Linking, Share, Platform } from 'react-native'
import styled from 'styled-components/native'
import { Movie, MovieDetails, TV, TVDetails } from '../type'
import { makeImgPath } from '../uitils'
import { LinearGradient } from 'expo-linear-gradient'
import { useTheme } from 'styled-components/native'
import img from '../components/Poster'
import Section from '../components/Section'
import { useQuery } from 'react-query'
import { MovieAPI, TVAPI } from '../service/MovieAPI'
import Loading from '../components/Loading'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

const { height: ScreenHeight } = Dimensions.get('window');

const Container = styled.View`
flex: 1;
background: ${props => props.theme.backgroundColor};
`
const Header = styled.View`
  width: 100%;
  padding: 0 20px;
  height: ${ScreenHeight / 3.5} ;
  align-items: flex-end;
  flex-direction: row;
  margin-bottom: 10px;
`;
const Background = styled.ImageBackground``;

const Poster = styled(img)`
  
`;
const Column = styled.View`
  padding: 10px 20px;
  flex: 1;
`;
const Title = styled.Text`
color: ${props => props.theme.textColor};
font-weight: bold;
font-size: 20px;
`;

const Main = styled.ScrollView`
padding: 0 20px;
`;

const OverView = styled.Text`
color: ${props => props.theme.foregroundColor};
font-size: 15px;
line-height: 21px;
`;

const VideoBtn = styled.TouchableOpacity`
flex-direction: row;
margin-bottom: 5px;
`;
const BtnText = styled.Text`
font-weight: 600;
color: ${props => props.theme.foregroundColor};
line-height: 20px;
margin-left: 10px;
`;

type RootStackParamList = {
  Detail: Movie | TV
}
type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({ navigation: { setOptions }, route: { params } }) => {

  const isMovie = "title" in params;
  const theme = useTheme();

  const { isLoading, data } = useQuery<MovieDetails | TVDetails>(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? MovieAPI.detail : TVAPI.detail);

  const openYTLink = async (key: string) => {
    const baseUrl = `https://m.youtube.com/watch?v=${key}`
    await Linking.openURL(baseUrl);
  };

  const onShare = async () => {
    if (data) {
      const isAndroid = Platform.OS === "android"
      const homepage = isMovie && "imdb_id" in data
        ? `https://www.imdb.com/title/${data.imdb_id}`
        : data.homepage;

      if (isAndroid) {
        await Share.share({
          message: `${params.overview}\nCheck it out: ${homepage}`,
          title: "title" in data
            ? data.title
            : data.name
        })
      } else {
        await Share.share({
          url: homepage,
          title: "title" in data
            ? data.title
            : data.name
        })
      }
    }


  }

  const ShareButton = () => <TouchableOpacity onPress={onShare}>
    <Ionicons name="share-outline" color={theme.foregroundColor} size={24} />
  </TouchableOpacity>


  useEffect(() => {
    setOptions({
      title: "title" in params
        ? "Movie"
        : "TV",

    })
  }, [])

  useEffect(() => {

    if (data) {
      setOptions({
        headerRight: () => <ShareButton />
      })
    }
  }, [data])


  return (
    <Container>
      <Header>
        <Background
          source={{ uri: makeImgPath(params.backdrop_path || "") }}
          style={StyleSheet.absoluteFill} />
        <LinearGradient
          colors={["transparent", theme.backgroundColor]}
          style={StyleSheet.absoluteFill} />
        <Poster posterPath={params.poster_path || ""} />
        <Column>
          <Title>
            {"title" in params ? params.title : params.name}
          </Title>
        </Column>
      </Header>
      <Main>
        {params.overview
          ? <Section title="줄거리">
            <OverView>{params.overview}</OverView>
          </Section>
          : null}
        {isLoading ? <Loading /> : null}
        {
          data?.videos?.results ? <Section title="비디오">
            {data.videos.results.map(video =>
              <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
                <Ionicons
                  name="logo-youtube"
                  style={{ color: theme.foregroundColor }}
                  size={20} />
                <BtnText>{video.name}</BtnText>
              </VideoBtn>)}
          </Section> : null
        }

      </Main>



    </Container>
  )
}

export default Detail
