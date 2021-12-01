import React, { useState } from 'react'
import { View, Text, RefreshControl } from "react-native"
import { useQuery, useQueryClient } from 'react-query';
import styled from "styled-components/native";
import { TVAPI } from '../service/MovieAPI';
import Loading from '../components/Loading';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import VMedia from '../components/VMedia';
import HList from '../components/HList';
import { TVResponse } from '../type';

const List = styled.FlatList`
paddingHorizontal: 20;
` as unknown as typeof FlatList;

const HSeperator = styled.View`
width: 10px;
`;

export default function Tv() {
  const queryClient = useQueryClient();
  const { isLoading: todayLoading, data: todayData, isRefetching: todayRefetching } = useQuery<TVResponse>(["tv", "today"], TVAPI.getAiringToday)
  const { isLoading: popularLoading, data: popularData, isRefetching: popularRefetching } = useQuery<TVResponse>(["tv", "popular"], TVAPI.getPopular)
  const { isLoading: toprateLoading, data: toprateData, isRefetching: toprateRefetching } = useQuery<TVResponse>(["tv", "toprate"], TVAPI.getTopRate)
  const { isLoading: trendingLoading, data: trendingData, isRefetching: trendingRefetching } = useQuery<TVResponse>(["tv", "trending"], TVAPI.getTrending)

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['tv']);
    setRefreshing(false);
  }
  const loading = todayLoading || popularLoading || toprateLoading || trendingLoading;


  return (
    loading ? <Loading /> :
      <ScrollView
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />} >
        <HList title="오늘 방송한 TV 프로그램" data={todayData?.results} />
        <HList title="요즘 대세인 TV 프로그램" data={trendingData?.results} />
        <HList title="인기있는 TV프로그램" data={popularData?.results} />
      </ScrollView>
  )
}