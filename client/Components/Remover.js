import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  Button
} from "react-native";

import { deleteUserFestival } from "../Fetch/Fetches";
import { Icon } from "react-native-elements";

export default class Remover extends Component {
  constructor(props) {
    super(props);
    this.rmUserFestival = this.rmUserFestival.bind(this);
  }

  rmUserFestival() {
    //this.props.festival_Id를 post요청을 보내 user_ID와 fest_ID관계를 삭제.
    //this.props.festival_Id로 festival_Id를 받음.

    deleteUserFestival(this.props.user_Id, this.props.festival_Id);
    this.props.refresh();
    Alert.alert("", "제거되었습니다!");
  }

  render() {
    return (
      <TouchableOpacity style={Styles.button} onPress={this.rmUserFestival}>
        <Icon name="minus" type="font-awesome" size={10} />
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
    fontSize: 15,
    opacity: 0.7,
    padding: 5,
    fontWeight: "700"
  }
});
