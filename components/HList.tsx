import React from "react";
import { Alert, FlatList } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "../styled";
import VMedia from "./VMedia";
import { Movie, TV } from "../type";

const ListContainer = styled.View`
margin: 20px 0;
`;

const ListTitle = styled.Text`
  color: ${props => props.theme.textColor};
  padding: 0 20px;
  font-size: 18px;
  font-weight: 900;
  margin-bottom: 20px;
`

const List = styled.FlatList`
paddingHorizontal: 20px;
` as unknown as typeof FlatList;

const HSeperator = styled.View`
width: 10px;
`;

interface HListProps {
  title: string;
  data: any[] | undefined;
  infinite?: boolean;
  onLoad?: () => void;
}

const HList: React.FC<HListProps> = ({ title, data, infinite = false, onLoad }) => {

  const onLoadMore = () => {
    if (!onLoad) {
      console.error('check page fetcher function! ')
    } else {
      onLoad()
    }
  }

  return (
    <ListContainer>
      <ListTitle>
        {title}
      </ListTitle>
      <List
        onEndReached={infinite ? onLoadMore : null}
        ItemSeparatorComponent={HSeperator}
        showsHorizontalScrollIndicator={false}
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          <VMedia
            id={item.id}
            posterPath={item.poster_path}
            title={item.title ?? item.name}
            voteAverage={item.vote_average}
            fullData={item}
          />

        } />
    </ListContainer>
  )
}

export default HList
