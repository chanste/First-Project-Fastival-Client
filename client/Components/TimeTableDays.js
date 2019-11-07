import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import TimeLineRender from "./TimeLineRender";
import { gray } from "ansi-colors";

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

    Alert.alert("", "" + day + "일을 선택하셨습니다.");
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
      <View
        style={{
          borderStyle: "solid",
          borderWidth: 2,
          borderRadius: 50,
          borderColor: "#f1f3f5",
          width: 50,
          height: 50,
          backgroundColor: "#f1f3f5",
          marginRight: 10,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 30,
          marginTop: 30
        }}
      >
        <Text
          onPress={() => this.getSelectedDay(item)}
          style={{
            textAlign: "center",
            fontSize: 20,
            padding: 10
          }}
        >
          {item}
        </Text>
      </View>
    );
  }

  render() {
    const stages = this.howManyStages();

    return (
      <View style={{ marginLeft: 15 }}>
        <FlatList
          data={this.props.timeTableStates.days}
          renderItem={this.Item}
          keyExtractor={item => "" + item}
          numColumns={7}
        />
        <TimeLineRender
          selectedDayData={this.props.timeTableStates.selectedDayData}
          stages={stages}
        />
      </View>
    );
  }
}
