import React, { Component } from "react";
import { View } from "react-native";
import TimeTableDays from "../Components/TimeTableDays";

const dummyDatas = [
  {
    concert_Id: 1,
    starttime: "07:30",
    endtime: "12:30",
    stage: "A",
    artist: "겁나게긴이름은어떻게",
    con_day: "1",
    festival_Id: "1",
    description: "개멋진 공연"
  },
  {
    concert_Id: 2,
    starttime: "12:30",
    endtime: "13:30",
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
    endtime: "15:30",
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
    endtime: "23:30",
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

  return lastSortedDatas;
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
    concertDatas: sortedDatas, // 데이터는 fetch 해 와야 함. getAllConcerts fetch는 구현 완료, 다만, 상위 컴포넌트에서 내려주는 festival_Id가 필요하므로, 추후 구현
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
    const daysLength = this.state.days.length;

    return (
      <View style={{ marginTop: 10 }}>
        <TimeTableDays
          timeTableStates={this.state}
          setSelectedDayData={this.setSelectedDayData}
          daysLength={daysLength}
        />
      </View>
    );
  }
}
