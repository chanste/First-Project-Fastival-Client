import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default class GoogleLogInButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={Styles.logo}>FESTIVAL</Text>

        <TouchableOpacity onPress={this.props.event} style={Styles.default}>
          <View style={Styles.button}>
            <Text style={{ opacity: 0.5 }}>Sign in with </Text>
            <Text style={{ color: "#2196f3" }}>G</Text>
            <Text style={{ color: "#ea2c2c" }}>o</Text>
            <Text style={{ color: "#f2d563" }}>o</Text>
            <Text style={{ color: "#2196f3" }}>g</Text>
            <Text style={{ color: "#43b52d" }}>l</Text>
            <Text style={{ color: "#ea2c2c" }}>e</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  button: {
    fontSize: 18,
    width: 220,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  default: {
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    fontSize: 60,
    opacity: 0.2,
    marginBottom: 200
  }
});
