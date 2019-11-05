import React, { Component } from "react";
import { View } from "react-native";
import TimeTableDays from "../Components/TimeTableDays";

const dummyDatas = [
  {
    concert_Id: 1,
    starttime: "07:30",
    endtime: "08:30",
    stage: "A",
    artist: "이현구",
    con_day: "1",
    festival_Id: "1",
    description: "개멋진 공연"
  },
  {
    concert_Id: 2,
    starttime: "11:30",
    endtime: "12:30",
    stage: "A",
    artist: "김형찬",
    con_day: "1",
    festival_Id: "1",
    description: "개멋진 공연"
  },
  {
    concert_Id: 3,
    starttime: "13:30",
    endtime: "15:30",
    stage: "A",
    artist: "윤호준",
    con_day: "1",
    festival_Id: "1",
    description: "개멋진 공연"
  },
  {
    concert_Id: 4,
    starttime: "16:30",
    endtime: "18:30",
    stage: "A",
    artist: "이경준",
    con_day: "1",
    festival_Id: "1",
    description: "개멋진 공연"
  },
  {
    concert_Id: 21,
    starttime: "07:30",
    endtime: "08:30",
    stage: "B",
    artist: "이현구2",
    con_day: "1",
    festival_Id: "1",
    description: "개멋진 공연"
  },
  {
    concert_Id: 22,
    starttime: "11:30",
    endtime: "13:30",
    stage: "B",
    artist: "김형찬2",
    con_day: "2",
    festival_Id: "1",
    description: "개멋진 공연"
  },
  {
    concert_Id: 23,
    starttime: "13:30",
    endtime: "15:30",
    stage: "A",
    artist: "윤호준2",
    con_day: "2",
    festival_Id: "1",
    description: "개멋진 공연"
  },
  {
    concert_Id: 24,
    starttime: "16:30",
    endtime: "20:30",
    stage: "B",
    artist: "이경준2",
    con_day: "2",
    festival_Id: "1",
    description: "개멋진 공연"
  }
];

//data는 먼저 날짜와 무대에 따라서 분류되어야 한다.
let sort = dataArr => {
  let sortedDatas = {};

  for (let i = 0; i < dummyDatas.length; i++) {
    let con_day = dummyDatas[i].con_day;
    let stage = dummyDatas[i].stage;
    if (!sortedDatas[con_day]) {
      sortedDatas[con_day] = {};
      sortedDatas[con_day][stage] = [dummyDatas[i]];
    } else {
      if (!sortedDatas[con_day][stage]) {
        sortedDatas[con_day][stage] = [dummyDatas[i]];
      } else {
        sortedDatas[con_day][stage].push(dummyDatas[i]);
      }
    }
  }

  return sortedDatas;
};
//결과로 이와같이 날짜 그리고 무대로 분류된 데이터 객체를 얻게 될 것이다.
// {
//   1:{A:[],B:[]},
//   2:{A:[],B:[]}
// }

const sortedDatas = sort(dummyDatas);

export default class TimeTable extends Component {
  constructor(props) {
    super(props);
    this.setSelectedDayData = this.setSelectedDayData.bind(this);
  }

  state = {
    days: [],
    concertDatas: sortedDatas,
    selectedDayData: {}
  };

  componentDidMount() {
    const newDays = [];

    for (let i in this.state.concertDatas) {
      newDays.push(i);
    }

    this.setState({
      ...this.state,
      days: newDays
    });
  }

  setSelectedDayData(day) {
    this.setState({
      ...this.state,
      selectedDayData: this.state.concertDatas[day]
    });
  }

  render() {
    // console.log("state: ", this.state);

    return (
      <View style={{ marginTop: 10 }}>
        <TimeTableDays
          timeTableStates={this.state}
          setSelectedDayData={this.setSelectedDayData}
        />
      </View>
    );
  }
}
