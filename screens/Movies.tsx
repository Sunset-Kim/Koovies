import React, { useState } from 'react'
import { Dimensions, FlatList } from 'react-native';
import styled from "styled-components/native"
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// slider
import Swiper from 'react-native-swiper';
// components
import Loading from '../components/Loading';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import { MovieAPI } from '../service/MovieAPI';
import { Movie, MovieResponse } from '../type';
import HList from '../components/HList';
import { getNextPage } from '../uitils';

// styled components
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const VSeperator = styled.View`
margin-bottom: 20px;
`;
const HSeperator = styled.View`
margin-right: 20px;
`;
const ListContainer = styled.View`
margin-bottom: 40px;
`;
const ListTitle = styled.Text`
  color: white;
  padding: 0 20px;
  font-size: 18px;
  font-weight: 900;
  margin-bottom: 20px;
`
const Movies: React.FC<NativeStackScreenProps<any, 'Movie'>> = ({ navigation: { navigate } }) => {

  // react-query
  const queryClient = useQueryClient();
  const { isLoading: nowPlayingLoading, error: nowPlayingError, data: nowPlayingData } = useQuery<MovieResponse>(["movie", "nowplyaing"], MovieAPI.getNowPlaying);
  const { isLoading: upcomingLoading, error: upcomingError, data: upcomingData, hasNextPage, fetchNextPage } = useInfiniteQuery<MovieResponse>(["movie", "upcoming"], MovieAPI.getUpcoming, {
    getNextPageParam: getNextPage
  });
  const { isLoading: popularLoading, error: popularError, data: popularData, hasNextPage: popularHasNextPage, fetchNextPage: popularFetchNextPage } = useInfiniteQuery(["movie", "popular"], MovieAPI.getPopular, {
    getNextPageParam: getNextPage
  });
  const { isLoading: trendingLoading, error: trendingError, data: trendingData } = useQuery<MovieResponse>(["movie", "trending"], MovieAPI.getTrending);

  const [refresing, setRefreshing] = useState(false);

  const loading = nowPlayingLoading || upcomingLoading ||
    popularLoading || trendingLoading;

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['movies']);
    setRefreshing(false);
  }

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  const popularPageFetcher = () => {
    if (popularHasNextPage) {
      popularFetchNextPage();
    }
  }

  return (
    loading ?
      <Loading /> :
      <FlatList
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        onRefresh={onRefresh}
        refreshing={refresing}
        ListHeaderComponent={<>
          <Swiper containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 3, marginBottom: 30 }}
            loop
            horizontal
            showsButtons={false}
            autoplay
            autoplayTimeout={2.5}
            showsPagination={false}
          >
            {
              nowPlayingData ?
                nowPlayingData.results.map(movie =>
                  <Slide
                    key={movie.id}
                    originalTitle={movie.title}
                    backdropPath={movie.backdrop_path || ""}
                    posterPath={movie.poster_path || ""}
                    voteAverage={movie.vote_average}
                    overview={movie.overview}
                    fulldata={movie}
                  />) : null
            }
          </Swiper>
          <HList title="인기작" data={popularData?.pages.map(page => page.results).flat()} infinite onLoad={popularFetchNextPage} />
          <ListContainer>
            <ListTitle>개봉예정작</ListTitle>
          </ListContainer ></>}
        keyExtractor={(item) => item.id + ""}
        data={upcomingData?.pages.map(page => page.results).flat()}
        ItemSeparatorComponent={VSeperator}
        renderItem={({ item }) =>
        (<HMedia id={item.id}
          releaseDate={item.release_date}
          posterPath={item.poster_path}
          title={item.title}
          voteAverage={item.vote_average}
          overview={item.overview}
          fullData={item}
        />)}
      />




  )
}

export default Movies;


