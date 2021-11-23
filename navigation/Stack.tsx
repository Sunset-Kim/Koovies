import React from "react";
import { Text, View, TouchableOpacity } from "react-native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { NativeScreen } from "react-native-screens";


const ScreenOne: React.FC<NativeStackScreenProps<any, "One">> = ({ navigation: { navigate } }) => <View>
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>One</Text>
  </TouchableOpacity>

</View>
const ScreenTwo: React.FC<NativeStackScreenProps<any, "Two">> = ({ navigation: { navigate } }) => <View>
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>
      Two
    </Text>
  </TouchableOpacity>
</View>
const ScreenThree: React.FC<NativeStackScreenProps<any, "Three">> = ({ navigation: { navigate, goBack } }) => (<View>
  <TouchableOpacity onPress={() => goBack()}>
    <Text>Three</Text>
  </TouchableOpacity>
</View>)

const NativeStack = createNativeStackNavigator();

const Stack = () => {

  return <NativeStack.Navigator screenOptions={{
    headerBackTitleVisible: false,

  }}>
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} />
  </NativeStack.Navigator>
}


export default Stack;