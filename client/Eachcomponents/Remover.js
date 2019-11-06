import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  Button
} from "react-native";

import { deleteUserFestival } from "../Fetch/Fetches";

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
      // <Button
      //   title="목록에서 제거"
      //   style={{ width: 140 }}
      //   onPress={this.rmUserFestival}
      // />
      <TouchableOpacity style={Styles.button} onPress={this.rmUserFestival}>
        <Text style={Styles.text}>제거</Text>
      </TouchableOpacity>
    );
  }
}

const Styles = StyleSheet.create({
  button: {
    backgroundColor: "#eaeaea",
    borderRadius: 5
  },
  text: {
    fontSize: 15,
    opacity: 0.7,
    padding: 5
  }
});
