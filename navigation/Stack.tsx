import React from "react";
import { useColorScheme } from "react-native"
import { createNativeStackNavigator, } from "@react-navigation/native-stack"
import Detail from "../screens/Detail";
import { lightTheme, darkTheme } from "../styled";


const NativeStack = createNativeStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() === "dark";

  return <NativeStack.Navigator screenOptions={{
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: !isDark ? lightTheme.backgroundColor : darkTheme.backgroundColor,
    },
    headerTitleStyle: {
      color: !isDark ? lightTheme.textColor : darkTheme.textColor
    },
  }}>
    <NativeStack.Screen name="Detail" component={Detail} />
  </NativeStack.Navigator>
}


export default Stack;