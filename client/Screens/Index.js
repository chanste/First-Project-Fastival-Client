import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import firebase from "firebase";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import UserConcert from "./UserConcert";
import Map from "./Map";
import Chatbox from "./Chatbox";
import TimeTable from "./TimeTable";
import Setting from "./Setting";

//<Button title="Sign out" onPress={() => firebase.auth().signOut()} />

class Index extends Component {
  constructor(props) {
    super(props);
    this.changeFestival = this.changeFestival.bind(this);
  }

  changeFestival() {
    this.props.navigation.navigate("FestivalSelect");
  }

  render() {
    return (
      <IndexNavigator
        screenProps={{
          user_Id: this.props.screenProps.user_Id,
          selectedFestival: this.props.screenProps.selectedFestival,
          changeFestival: this.changeFestival
        }}
      />
    );
  }
}

// const UserConcertStack = createSwitchNavigator(
//   {
//     UserConcert
//   }
// );
// const TimeTableStack = createSwitchNavigator(
//   {
//     TimeTable
//   }
// );
// const MapStack = createSwitchNavigator(
//   {
//     Map
//   }
// );
// const ChatboxStack = createSwitchNavigator(
//   {
//     Chatbox
//   }
// );
// const SettingStack = createSwitchNavigator(
//   {
//     Setting
//   }
// );

const TabNavigator = createBottomTabNavigator(
  {
    MyConcert: UserConcert,
    TimeTable: TimeTable,
    Map: Map,
    Chatbox: Chatbox,
    Setting: Setting
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let icon = "▲";

        if (routeName === "MyConcert") {
          icon = "❤️";
        } else if (routeName === "TimeTable") {
          icon = "⏱️";
        } else if (routeName === "Map") {
          icon = "🗺️";
        } else if (routeName === "Chatbox") {
          icon = "💬";
        } else if (routeName === "Setting") {
          icon = "⚙️";
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
      inactiveTintColor: "#888"
    }
  }
);

const IndexNavigator = createAppContainer(TabNavigator);

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
