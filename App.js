import React from 'react';
import AppLoading from 'expo-app-loading';
import { useAssets } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/Root';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { lightTheme, darkTheme } from './styled';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

export default function App() {
  const [assets] = useAssets([require("./assets/logo.png")]);
  const [loaded] = Font.useFonts(Ionicons.font);
  const isDark = useColorScheme() === 'dark';
  const queryClient = new QueryClient()

  if (!assets || !loaded) {
    return (
      <AppLoading />
    );
  }
  // 네비게이션 렌더링 하려면
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme} >
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>


  )

}

