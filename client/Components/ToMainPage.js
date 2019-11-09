import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default class ToMainPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.event}
        style={[Styles.default, Styles.shadow]}
      >
        <Text style={{ fontSize: 18, opacity: 0.5 }}>To Main Page</Text>
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
    borderStyle: "solid",
    borderBottomWidth: 0
  }
});
