import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
export default class UserConcert extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* <Text>{this.props.screenProps.selectedFestival.name}</Text> */}
        <Text>userconcert</Text>
      </View>
    );
  }
}
