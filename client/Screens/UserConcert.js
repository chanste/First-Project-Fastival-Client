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
    this.removeEvent = this.removeEvent.bind(this);
  }

  state = {
    days: [],
    concertDatas: [], // 데이터는 fetch 해 와야 함. getAllConcerts fetch는 구현 완료, 다만, 상위 컴포넌트에서 내려주는 festival_Id가 필요하므로, 추후 구현
    selectedDayData: {}
  };

  componentDidMount() {
    this.getConcertDatas();

    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.getConcertDatas();
    });
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

    getUserConcerts(user_Id, festival_Id, this.setSortedDatas);
  }

  setSortedDatas(inputDatas) {
    //data는 먼저 날짜와 무대에 따라서 분류되어야 한다.
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

  removeEvent(day) {
    this.getConcertDatas();
    this.setState({
      ...this.state,
      selectedDayData: {}
    });
  } //리무브 혹은 에드 버튼이 눌렸을때, 유저 콘서트 리스트 데이터를 새로 받아오고, selectedDayData를 비워야한다.
  //안그러면, 콘서트 추가 혹은 제거 이후 myConcertPage를 새로 열면 기존에 선택되어있는 selectedDayData의 그래프가 남아있게된다.
  //day 파라미터는 selectedDayData를 새로 받아오기 위해서인데... 비동기의 문제로 getConcertDatas()를 실행하면 삭제이전의 정보들이 넘어온다.

  render() {
    const daysLength = this.state.days.length;
    return (
      <View>
        {this.state.days.length === 0 ? (
          <View
            style={{
              marginTop: 350,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                opacity: 0.4
              }}
            >
              당신의 콘서트를 추가해 주세요!
            </Text>
          </View>
        ) : (
          <TimeTableDays
            timeTableStates={this.state}
            setSelectedDayData={this.setSelectedDayData}
            daysLength={daysLength}
            add={false}
            remove={true}
            removeEvent={this.removeEvent}
          />
        )}
      </View>
    );
  }
}
