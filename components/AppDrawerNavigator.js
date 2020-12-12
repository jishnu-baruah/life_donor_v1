import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import MCardScreen from "../screens/MCardScreen";
import EDonorCard from "../screens/EDonorCard";
import MyRequestScreen from "../screens/MyRequestScreen";
import ChatScreen from "../screens/ChatScreen";
import RequestScreen from "../screens/RequestScreen";
import { Icon } from "react-native-elements";
import CustomSideBarMenu from "./CustomSideBarMenu";

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        drawerIcon: <Icon name="home" type="fontawesome5" />,
      },
    },
    Medical_Card: {
      screen: MCardScreen,
      navigationOptions: {
        drawerIcon: <Icon name="local-hospital" type="fontawesome5" />,
      },
    },
    Donor_Card: {
      screen: EDonorCard,
      navigationOptions: {
        drawerIcon: <Icon name="card-membership" type="fontawesome5" />,
      },
    },
    Chats: {
      screen: ChatScreen,
      navigationOptions: {
        drawerIcon: <Icon name="chat" type="fontawesome5" />,
      },
    },
    My_Requests: {
      screen: MyRequestScreen,
      navigationOptions: {
        drawerIcon: <Icon name="person-pin" type="fontawesome5" />,
      },
    },
    All_Requests: {
      screen: RequestScreen,
      navigationOptions: {
        drawerIcon: <Icon name="list" type="fontawesome5" />,
      },
    },
    About: {
      screen: AboutScreen,
      navigationOptions: {
        drawerIcon: <Icon name="info" type="fontawesome5" />,
      },
    },
  },
  {
    contentComponent: CustomSideBarMenu,
  },
  {
    initialRouteName: "Home",
  }
);
export default AppDrawerNavigator;
