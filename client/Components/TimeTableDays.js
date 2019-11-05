import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import TimeLineRender from "./TimeLineRender";

// Get Datas [{concert_Id : int, starttime : str, endtime,  stage : str, artist : str, con_day : int, fest_Id : int}, {data2}, {data3}....]

export default class TimeTableDaysRender extends Component {
  constructor(props) {
    super(props);
    this.Item = this.Item.bind(this);
    this.getSelectedDay = this.getSelectedDay.bind(this);
    this.howManyStages = this.howManyStages.bind(this);
  }

  state = {
    stages: []
  };

  getSelectedDay(day) {
    this.props.setSelectedDayData(day);

    alert("" + day + "일을 선택하셨습니다.");
  }

  howManyStages() {
    let stages = [];
    for (let i in this.props.timeTableStates.selectedDayData) {
      if (!stages.includes(i)) {
        stages.push(i);
      }
    }
    return stages;
  }

  Item({ item }) {
    return (
      <Text
        onPress={() => this.getSelectedDay(item)}
        style={{ fontSize: 30, flexDirection: "row", flexWrap: "wrap" }}
      >
        {item}
      </Text>
    );
  }

  render() {
    const stages = this.howManyStages();
    // console.log("TimeTableDays Props : ", this.props);
    // console.log("this State: ", stages);
    return (
      <View>
        <FlatList
          data={this.props.timeTableStates.days}
          renderItem={this.Item}
          keyExtractor={item => "" + item}
        />
        <TimeLineRender
          selectedDayData={this.props.timeTableStates.selectedDayData}
          stages={stages}
        />
      </View>
    );
  }
}
