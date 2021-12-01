import React from 'react';
import { useColorScheme } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { darkTheme, lightTheme } from '../styled';

const VoteText = styled.Text`
  color: ${props => props.theme.foregroundColor};
`;

interface VoteProps {
  voteAverage?: number;
};

const Vote: React.FC<VoteProps> = ({ voteAverage }) => {

  return (
    <VoteText>
      {voteAverage &&
        voteAverage > 0 ?
        `⭐️ ${voteAverage} / 10`
        : `ComingSoon`}
    </VoteText>

  )
};

export default Vote;
