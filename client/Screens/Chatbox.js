import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import firebase from 'firebase'

export default class Chatbox extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Chatbox</Text>
          <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
        </View>
      );
    }
  }
