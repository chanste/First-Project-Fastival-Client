import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import { addUserFestival } from "../Fetch/Fetches";
import { Icon } from "react-native-elements";

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
        <Icon name="plus" type="font-awesome" size={11} />
      </TouchableOpacity>
    );
  }
}

const Styles = StyleSheet.create({
  button: {
    backgroundColor: "#f1f3f5",
    borderRadius: 5,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 10,
    opacity: 0.7,
    padding: 5
  }
});
