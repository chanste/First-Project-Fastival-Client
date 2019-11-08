import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import TimeTableDays from "../Components/TimeTableDays";
import { getUserConcerts } from "../Fetch/Fetches";
import firebase from "firebase";

export default class UserConcert extends React.Component {
  constructor(props) {
    super(props);
    this.setSelectedDayData = this.setSelectedDayData.bind(this);
    this.getConcertDatas = this.getConcertDatas.bind(this);
    this.setSortedDatas = this.setSortedDatas.bind(this);
  }

  state = {
    days: [],
    concertDatas: [], // 데이터는 fetch 해 와야 함. getAllConcerts fetch는 구현 완료, 다만, 상위 컴포넌트에서 내려주는 festival_Id가 필요하므로, 추후 구현
    selectedDayData: {}
  };

  componentDidMount() {
    console.log("componentDidMount");
    this.getConcertDatas();
  }

  setSelectedDayData(day) {
    this.setState({
      ...this.state,
      selectedDayData: this.state.concertDatas[day]
    });
  }

  getConcertDatas() {
    const user_Id = firebase.auth().currentUser.uid;
    const festival_Id = this.props.screenProps.selectedFestival.festival_Id;

    console.log("getConcertDatas");

    getUserConcerts(user_Id, festival_Id, this.setSortedDatas);
  }

  setSortedDatas(inputDatas) {
    //data는 먼저 날짜와 무대에 따라서 분류되어야 한다.
    // console.log("inputData: ", inputDatas);
    console.log("setSortedDatas");
    let sortedDatas = {};

    for (let i = 0; i < inputDatas.length; i++) {
      let con_day = inputDatas[i].con_day;
      let stage = inputDatas[i].stage;
      if (!sortedDatas[con_day]) {
        sortedDatas[con_day] = {};
        sortedDatas[con_day][stage] = [inputDatas[i]];
      } else {
        if (!sortedDatas[con_day][stage]) {
          sortedDatas[con_day][stage] = [inputDatas[i]];
        } else {
          sortedDatas[con_day][stage].push(inputDatas[i]);
        }
      }
    }
    //날짜와 스테이지별로 분류가 되나, 날짜별로 분리 된 이후, 첫 데이터의 스테이지에 따라서 날짜 하위 객체의 키값(스테이지)이 흐트러진다.

    let lastSortedDatas = {};

    for (let i in sortedDatas) {
      const ordered = {};
      Object.keys(sortedDatas[i])
        .sort()
        .forEach(function(key) {
          ordered[key] = sortedDatas[i][key];
        });
      lastSortedDatas[i] = ordered;
    }
    //이를통해 스테이지 순서 또한 바로 잡을 수 있다.

    //정렬된 데이터를 스테이트에 넣어준다.
    this.setState({
      ...this.state,
      concertDatas: lastSortedDatas
    });

    const newDays = [];
    for (let i in this.state.concertDatas) {
      newDays.push(i);
    }
    this.setState({
      ...this.state,
      days: newDays
    });
  }

  render() {
    const daysLength = this.state.days.length;
    return (
      <View>
        <TimeTableDays
          timeTableStates={this.state}
          setSelectedDayData={this.setSelectedDayData}
          daysLength={daysLength}
        />
      </View>
    );
  }
}
