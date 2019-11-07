import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default class GoogleLogInButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.event}
        style={[Styles.default, Styles.shadow]}
      >
        <Text style={{ fontSize: 18 }}>
          <Text style={{ opacity: 0.5 }}>Sign in with </Text>
          <Text style={{ color: "#2196f3" }}>G</Text>
          <Text style={{ color: "#ea2c2c" }}>o</Text>
          <Text style={{ color: "#f2d563" }}>o</Text>
          <Text style={{ color: "#2196f3" }}>g</Text>
          <Text style={{ color: "#43b52d" }}>l</Text>
          <Text style={{ color: "#ea2c2c" }}>e</Text>
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
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  }
});
