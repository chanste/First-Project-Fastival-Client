import React, { Component } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import TimeLine from "./TimeLine";
import firebase from "firebase";

export default class TimeLineRender extends Component {
  constructor(props) {
    super(props);
    this.Item = this.Item.bind(this);
  }

  state = {};

  Item({ item }) {
    return (
      <TimeLine
        data={this.props.selectedDayData[item]}
        addButton={this.props.add}
        removeButton={this.props.remove}
        details={this.props.selectedDayData[item].artist}
        style={styles.style}
        user_Id={firebase.auth().currentUser.uid}
      />
    );
  }

  render() {
    return (
      <FlatList
        data={this.props.stages}
        renderItem={this.Item}
        keyExtractor={item => "" + item}
        numColumns={2}
        style={{ marginBottom: 300 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  //style = 제목을 포함한 각 테이블단위
  style: {
    marginBottom: 70,
    marginRight: 5
  },
  //제목을 제외 순수 테이블 스타일
  listViewStyle: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  //각 이벤트열
  rowContainerStyle: {
    width: 150
  },
  //시간표 출력 구간 전부
  FlatList: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
