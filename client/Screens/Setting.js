import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import firebase from "firebase";
import SignOut from "../Components/SignOut";
import ToMainPage from "../Components/ToMainPage";

class Setting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ToMainPage event={() => this.props.screenProps.changeFestival()} />
        <SignOut event={() => firebase.auth().signOut()} />
      </View>
    );
  }
}

export default Setting;
