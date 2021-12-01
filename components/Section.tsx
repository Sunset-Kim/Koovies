import React, { ReactChild } from 'react'
import { View } from 'react-native'
import styled from "styled-components/native"
const Container = styled.View`
  margin-bottom: 20px;
`;
const Title = styled.Text`
font-size: 16px;
font-weight: bold;
color: ${props => props.theme.foregroundColor};
margin-bottom: 10px;
`;

interface SectionProps {
  title: string;
  children?: ReactChild | Element[];
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <View>
        {children}
      </View>
    </Container>

  )
}

export default Section
