import React, { Component } from "react";
import { StyleSheet, FlatList } from "react-native";
import TimeLine from "./TimeLine";

export default class TimeLineRender extends Component {
  constructor(props) {
    super(props);
    this.Item = this.Item.bind(this);
    this.addMyConcert = this.addMyConcert.bind(this);
  }

  state = {};

  componentDidMount() {}

  addMyConcert() {
    //post요청 TimeLine 컴포넌트에 props를 넘겨주며 동시에 add버튼에 이벤트를 달아주자...
  }

  Item({ item }) {
    return (
      <TimeLine
        data={this.props.selectedDayData[item]}
        addButton={true}
        details={this.props.selectedDayData[item].artist}
        style={styles.style}
        // listViewStyle={styles.listViewStyle}
        // rowContainerStyle={styles.rowContainerStyle}
      />
    );
    // return <Text>{item}</Text>;
  }

  render() {
    // console.log("TimeLineRender : ", this.props);
    // console.log("this.state.stages: ", this.props.stages);
    // console.log("TimeLineRender: ", this.state);
    return (
      <FlatList
        data={this.props.stages}
        renderItem={this.Item}
        keyExtractor={item => "" + item}
        numColumns={2}
      />
    );
    {
      /* <Text>
          Test: {this.props.stages[0] ? this.props.stages[0] : "none"}
        </Text> */
    }
  }
}

const styles = StyleSheet.create({
  //style = 제목을 포함한 각 테이블단위
  style: {
    // justifyContent: "center"
    // alignItems: "center"
  },
  //제목을 제외 순수 테이블 스타일
  listViewStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "green"
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
