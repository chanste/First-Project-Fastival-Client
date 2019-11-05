import React, { Component } from "react";
import {
  Button
} from "react-native";
import { addUserFestival } from "../Fetch/Fetches";

export default class Adder extends Component {
  constructor(props) {
    super(props);
    this.addUserFestival = this.addUserFestival.bind(this);
  }

  addUserFestival() {
    //this.props.festival_Id를 post요청을 보내 user_ID와 fest_ID매칭
    addUserFestival(this.props.user_Id, this.props.festival_Id);
    alert("추가되었습니다!");
  }

  render() {
    return (
      <Button
        title="내 목록에 추가"
        style={{ width: 140 }}
        onPress={this.addUserFestival}
      />
    );
  }
}
