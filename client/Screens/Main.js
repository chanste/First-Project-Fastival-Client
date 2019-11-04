import React, { Component } from "react";
import { StyleSheet, View, Button, FlatList, Text, Image } from "react-native";
import SearchPage from "./SearchPage";
import UserConcert from "./UserConcert";
import Remover from "../Components/Remover";

import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { getAllFestivals, getUserFestivals } from "../Fetch/Fetches";

const dummyDatas = [
  {
    festival_Id: 1,
    name: "거리축제",
    img_url:
      "https://www.mcst.go.kr/attachFiles/cultureInfoCourt/localFestival/notifyFestival/1512953371989.jpg",
    user_Id: 0
  },
  {
    festival_Id: 2,
    name: "X게임",
    img_url: "https://i.ytimg.com/vi/eUqvfODmvHI/maxresdefault.jpg",
    user_Id: 0
  },
  {
    festival_Id: 3,
    name: "Sausage Party",
    img_url: "https://friendzhelp.files.wordpress.com/2011/10/sad-gamers.jpg",
    user_Id: 0
  }
];

//Get=[{festival_Id: int, name: str, img_url: str}, {data2}, {data3}, ....]
class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this._toSearchPage = this._toSearchPage.bind(this);
    this.setUserFestivals = this.setUserFestivals.bind(this);
    this.Item = this.Item.bind(this);
    this.selectFestival = this.selectFestival.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Button
          title="Find more Festivals"
          onPress={() => {
            navigation.getParam("toSearchPage")();
          }}
          style={{}}
        />
      )
    };
  };

  state = {
    userFestivals: dummyDatas,
    user_Id: 0,
    selectedFestival: []
  };

  _toSearchPage() {
    this.props.navigation.navigate(`SearchPage`);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      toSearchPage: this._toSearchPage
    });
    this.setState({
      ...this.state,
      userFestival: this.props.screenProps.userFestivals,
      user_Id: this.props.screenProps.user_Id
    });

    getUserFestivals(this.state.user_Id, this.setUserFestivals);
  }

  //유저 festivalList 정보를 불러오고, state 업데이트
  setUserFestivals(data) {
    const newUserFestivals = data.slice();
    for (let i = 0; i < newUserFestivals.length; i++) {
      newUserFestivals[i].user_Id = this.state.user_Id;
    }
    this.setState({
      ...this.state,
      userFestivals: newUserFestivals
    });
  }

  selectFestival(item) {
    this.setState({
      ...this.state,
      selectFestival: item
    });

    this.props.screenProps.setSelectedFestival(item);

    this.props.navigation.navigate("FestivalPage");
  }

  Item({ item }) {
    return (
      <View style={{ marginTop: 10 }}>
        <View style={{}}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 20 }}
            source={{ uri: item.img_url }}
          />
          <Text
            onPress={() => this.selectFestival(item)}
            style={{ fontSize: 20, fontWeight: "600" }}
          >
            {item.name}
          </Text>
        </View>
        <Remover festival_Id={item.festival_Id} user_Id={item.user_Id} />
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.state.userFestivals.length === 0 ? (
          <Button
            title="Add Your Festivals"
            onPress={() => this._toSearchPage()}
          />
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 100
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 100
              }}
            >
              <View>
                <Text
                  style={{ marginTop: 20, fontSize: 30, fontWeight: "700" }}
                >
                  My Festival List
                </Text>
              </View>
              <FlatList
                data={this.state.userFestivals}
                renderItem={this.Item}
                keyExtractor={item => {
                  // console.log("keyExtractor: ", item);
                  return "" + item.festival_Id; // this must be string
                }}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

const AppStackNavigator = createStackNavigator(
  {
    Main: MainScreen,
    SearchPage: SearchPage
  },
  { initialRouteName: "Main" }
);

//Festival페이지와 Concert페이지 라우팅.
const UserFestivalNavigator = createSwitchNavigator({
  FestivalPage: UserConcert
});
const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      FestivalSelect: AppStackNavigator,
      ConcertSelect: UserFestivalNavigator
    },
    { initialRouteName: "FestivalSelect" }
  )
);

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.setFestivlas = this.setFestivlas.bind(this);
    this.setSelectedFestival = this.setSelectedFestival.bind(this);
  }

  state = {
    festivals: [], // get fetivals, 대신 불러온 데이터 하나하나에 유저 id를 삽입한다. Adder와 Remover때문, 그리고 각 페스티벌 아이디는 UserId라는 항목을 갖고있음.
    user_Id: 0, //로그인 된 유저 ID
    selectedFestival: []
  };

  componentDidMount() {
    //컴포넌트 마운트 직후 바로 festival 데이터 fetching
    getAllFestivals(this.setFestivlas);
  }

  //get해온 각 데이터에 유저 ID속성 추가 및 state에 새로운 데이터 추가.
  setFestivlas(data) {
    // const newFestivals = data.slice();
    // for (let i = 0; i < newFestivals.length; i++) {
    //   newFestivals[i].user_Id = this.state.user_Id;
    // }
    // this.setState({
    //   ...this.state,
    //   festivals: newFestivals
    // });
    // this.setState({
    //   ...this.state,
    //   festivals: dummyDatas
    // });
  }

  setSelectedFestival(item) {
    this.setState({
      ...this.state,
      selectedFestival: item
    });
  }

  render() {
    return (
      <AppContainer
        screenProps={{
          festivals: this.state.festivals,
          user_Id: this.state.user_Id,
          selectedFestival: this.state.selectedFestival,
          setSelectedFestival: this.setSelectedFestival
        }}
      />
    );
  }
}

const styles = StyleSheet.create({});
