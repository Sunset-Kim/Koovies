import React from 'react'
import { View, Text } from "react-native"
import styled from "styled-components/native";

const Page = styled.View`
flex: 1;
justify-content: center;
align-items: center;
`

export default function Tv() {
  return (
    <Page>
      <Text>Tv</Text>
    </Page>
  )
}