import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import { darkTheme } from '../styled';

const Container = styled.View`
flex: 1;
justify-content: center;
align-items: center;
`;

const Loading: React.FC = (props) => {
  return (
    <Container>
      <ActivityIndicator size="large" color={darkTheme.primary} />
    </Container>
  )
}

export default Loading;
