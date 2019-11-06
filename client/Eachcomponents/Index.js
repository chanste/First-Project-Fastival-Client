import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import firebase from "firebase";
import {
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import UserConcert from "../Screens/UserConcert";
import Timetable from "../Screens/Timetable";
import Map from "../Screens/Map";
import Chatbox from "../Screens/Chatbox";

//<Button title="Sign out" onPress={() => firebase.auth().signOut()} />

class Index extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return <IndexNavigator 
    screenProps={{
      user_Id : this.props.screenProps.user_Id,
      selectedFestival : this.props.screenProps.selectedFestival
    }}
    />;
  }
}

const UserConcertStack = createStackNavigator(
  {
      UserConcert
  },
  {
      defaultNavigationOptions: ({navigation}) => ({
          title: '내 공연!!!!!!',
      })
  }
);
const TimetableStack = createStackNavigator(
  {
    Timetable
  },
  {
      defaultNavigationOptions: ({navigation}) => ({
          title: '페스티벌 일정표',
      })
  }
);
const MapStack = createStackNavigator(
  {
    Map
  },
  {
      defaultNavigationOptions: ({navigation}) => ({
          title: '지도',
      })
  }
);
const ChatboxStack = createSwitchNavigator(
  {
    Chatbox
  },
  {
      defaultNavigationOptions: ({navigation}) => ({
          title : "채팅"
      })
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    UserConcert: UserConcertStack,
    Timetable: TimetableStack,
    Map: MapStack,
    Chatbox: ChatboxStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let icon = "▲";

        if (routeName === "UserConcert") {
          icon = "❤️";
        } else if (routeName === "Timetable") {
          icon = "⏱️";
        } else if (routeName === "Map") {
          icon = "🗺️";
        } else if (routeName === "Chatbox") {
          icon = "💬";
        }
        // can use react-native-vector-icons
        // <Icon name={iconName} size={iconSize} color={iconColor} />
        return (
          <Text style={{ color: (focused && "#46c3ad") || "#888" }}>
            {icon}
          </Text>
        );
      }
    }),
    lazy: false,
    tabBarOptions: {
      activeTintColor: "#46c3ad",
      inactiveTintColor: "#888",
    }
  }
)

const IndexNavigator = createAppContainer(TabNavigator);

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
