import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox, StyleSheet, Text, View } from "react-native";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import { AppDrawerNavigator } from "./components/AppDrawerNavigator";
// import { AppTabNavigator } from "./components/AppTabNavigator";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

console.disableYellowBox = true;

export default function App() {
  return <AppContainer />;
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen: { screen: WelcomeScreen },
  // HomeScreen: { screen: HomeScreen },
  Drawer: { screen: AppDrawerNavigator },
  // BottomTab: {screen: AppTabNavigator},
});
const AppContainer = createAppContainer(switchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
