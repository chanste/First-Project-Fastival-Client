import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import firebase from "firebase";

class Setting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="Change Festival" onPress={() => this.props.screenProps.changeFestival()} />
        <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
      </View>
    );
  }
}

export default Setting;
