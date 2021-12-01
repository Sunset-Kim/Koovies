import React, { useState } from 'react'
import { useQuery } from 'react-query';
import styled from 'styled-components/native'
import HList from '../components/HList';
import Loading from '../components/Loading';
import { MovieAPI, TVAPI } from '../service/MovieAPI';

const Container = styled.ScrollView``;
const SearchBar = styled.TextInput`
background: white;
padding: 10px 15px;
width: 90%;
margin: 10px auto;
border-radius: 50px;
`;


export default function Search() {
  const [query, setQuery] = useState("");

  const onChangeText = (text: string) => setQuery(text);
  const { isLoading: movieLoading, data: movieData, refetch: searchMovie } = useQuery(["searchMovie", query], MovieAPI.search, { enabled: false })
  const { isLoading: tvLoading, data: tvData, refetch: searchTv } = useQuery(["search", query], TVAPI.search, { enabled: false })

  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovie();
    searchTv();
  }

  return (
    <Container>
      {movieLoading || tvLoading ? <Loading /> : null}
      <SearchBar
        placeholder="Input your keyword"
        placeholderTextColor="gray"
        returnKeyType="search"
        autoCapitalize="none"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        autoCorrect={false}
      />
      {movieData ? <HList title="영화 검색결과" data={movieData.results} /> : null}
      {tvData ? <HList title="TV 검색결과" data={tvData.results} /> : null}


    </Container >
  )
}