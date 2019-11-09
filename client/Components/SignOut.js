import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default class SignOut extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.event}
        style={[Styles.default, Styles.shadow]}
      >
        <Text style={{ fontSize: 18, opacity: 0.5 }}>
          <Text style={{}}>Sign out</Text>
        </Text>
      </TouchableOpacity>
    );
  }
}

const Styles = StyleSheet.create({
  shadow: {
    elevation: 1
  },
  default: {
    width: 200,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0
  }
});
