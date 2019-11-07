import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import { addUserFestival } from "../Fetch/Fetches";

export default class Adder extends Component {
  constructor(props) {
    super(props);
    this.addUserFestival = this.addUserFestival.bind(this);
  }

  addUserFestival() {
    //this.props.festival_Id를 post요청을 보내 user_ID와 fest_ID매칭
    addUserFestival(this.props.user_Id, this.props.festival_Id);
    Alert.alert("", "추가되었습니다!");
  }

  render() {
    return (
      <TouchableOpacity style={Styles.button} onPress={this.addUserFestival}>
        <Text style={Styles.text}>추가</Text>
      </TouchableOpacity>
    );
  }
}

const Styles = StyleSheet.create({
  button: {
    backgroundColor: "#f1f3f5",
    borderRadius: 5
  },
  text: {
    fontSize: 10,
    opacity: 0.7,
    padding: 5
  }
});
