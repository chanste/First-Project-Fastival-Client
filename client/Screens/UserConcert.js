import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
export default class UserConcert extends React.Component {
  render() {
    // console.log(this.props.screenProps);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{this.props.screenProps.selectedFestival.name}</Text>
      </View>
    );
  }
}
