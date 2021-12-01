import React from "react";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons"
import { lightTheme, darkTheme } from "../styled";


const Tab = createBottomTabNavigator();

const Tabs: React.FC = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <Tab.Navigator sceneContainerStyle={{
      backgroundColor: !isDark ? lightTheme.backgroundColor : darkTheme.backgroundColor
    }} screenOptions={{
      unmountOnBlur: true,
      headerTitleStyle: {
        color: !isDark ? lightTheme.textColor : darkTheme.textColor
      },
      headerStyle: {
        backgroundColor: !isDark ? lightTheme.backgroundColor : darkTheme.backgroundColor,
      },
      tabBarStyle: {
        backgroundColor: !isDark ? lightTheme.backgroundColor : darkTheme.backgroundColor,
      },
      tabBarActiveTintColor: !isDark ? lightTheme.textColor : darkTheme.textColor,
      tabBarInactiveTintColor: !isDark ? lightTheme.foregroundColor : darkTheme.foregroundColor,
      tabBarLabelStyle: {
        marginTop: -5,
        fontSize: 13,
        fontWeight: "500"
      }
    }}>
      <Tab.Screen name="Movies" component={Movies} options={{
        tabBarIcon: (({ focused, color, size }) => {
          return <Ionicons name={focused ? "film" : "film-outline"} size={size} color={color} />
        })
      }} />
      <Tab.Screen name="TV" component={Tv} options={{
        tabBarIcon: (({ focused, color, size }) => {
          return <Ionicons name={focused ? "tv" : "tv-outline"} size={size} color={color} />
        })
      }} />
      <Tab.Screen name="Search" component={Search} options={{
        tabBarIcon: (({ focused, color, size }) => {
          return <Ionicons name="ios-search" size={size} color={color} />
        })
      }} />
    </Tab.Navigator>
  )
}

export default Tabs;