import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Button,
  FlatList,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import SearchPage from "./SearchPage";
import UserConcert from "./UserConcert";
import Remover from "../Components/Remover";

import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import firebase from "firebase";
import { getAllFestivals, getUserFestivals } from "../Fetch/Fetches";
import Index from "./Index";
import { Icon } from "react-native-elements";

//Get=[{festival_Id: int, name: str, img_url: str}, {data2}, {data3}, ....]
class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this._toSearchPage = this._toSearchPage.bind(this);
    this.setUserFestivals = this.setUserFestivals.bind(this);
    this.Item = this.Item.bind(this);
    this.selectFestival = this.selectFestival.bind(this);
    this.refresh = this.refresh.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.getParam("toSearchPage")();
          }}
          style={{
            display: "flex",
            flexDirection: "row",
            width: 350,
            opacity: 0.3,
            alignItems: "center"
          }}
        >
          <Icon name="search" type="font-awesome" size={15} />
          <Text style={{ marginLeft: 10 }}>Find more Festivals</Text>
        </TouchableOpacity>
      )
    };
  };

  state = {
    userFestivals: []
  };

  refresh() {
    getUserFestivals(this.props.screenProps.user_Id, this.setUserFestivals);
  }

  _toSearchPage() {
    this.props.navigation.navigate(`SearchPage`);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      toSearchPage: this._toSearchPage
    });
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      getUserFestivals(this.props.screenProps.user_Id, this.setUserFestivals);
    });
  }

  //유저 festivalList 정보를 불러오고, state 업데이트
  setUserFestivals(data) {
    this.setState({
      ...this.state,
      userFestivals: data
    });
  }
  //페스티벌을 골랐을 때 인덱스로 넘어감
  selectFestival(item) {
    this.props.screenProps.setSelectedFestival(item);

    this.props.navigation.navigate("Index");
  }

  //userfestival이 item으로 들어감
  Item({ item }) {
    const uId = firebase.auth().currentUser.uid;
    return (
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          borderColor: "#f1f3f5",
          borderStyle: "solid",
          borderBottomWidth: 1,
          paddingBottom: 10
        }}
      >
        <Image
          style={{ width: 40, height: 40, borderRadius: 20 }}
          source={{ uri: item.img_url }}
        />
        <Text
          onPress={() => this.selectFestival(item)}
          style={{
            fontSize: 15,
            fontWeight: "600",
            marginRight: 10,
            marginLeft: 10,
            opacity: 0.6,
            width: 300
          }}
        >
          {item.name}
        </Text>
        <Remover
          festival_Id={item.festival_Id}
          user_Id={firebase.auth().currentUser.uid}
          refresh={item.refresh}
        />
      </View>
    );
  }

  render() {
    const datas = this.state.userFestivals;
    // for (const item of datas) {
    //   item.refresh = this.refresh;
    // }
    for (let i = 0; i < datas.length; i++) {
      datas[i].refresh = this.refresh;
    }

    return this.state.userFestivals.length === 0 ? (
      <TouchableOpacity
        onPress={() => this._toSearchPage()}
        style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
      >
        <Text style={{ fontSize: 15, opacity: 0.5 }}>
          여기를 눌러 원하는 페스티벌을 추가하세요!
        </Text>
      </TouchableOpacity>
    ) : (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            marginTop: 10,
            marginBottom: 10,
            fontSize: 20,
            fontWeight: "700",
            opacity: 0.1
          }}
        >
          My Festival List
        </Text>
        <Text
          style={{
            borderTopWidth: 1,
            borderStyle: "solid",
            borderColor: "#e2e2e2",
            width: 2000,
            fontSize: 1
          }}
        >
          {" "}
        </Text>
        <FlatList
          data={datas}
          renderItem={this.Item}
          keyExtractor={item => {
            return "" + item.festival_Id; // this must be string
          }}
        />
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
  Index: Index
});
const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      FestivalSelect: AppStackNavigator,
      Index: UserFestivalNavigator
    },
    { initialRouteName: "FestivalSelect" }
  )
);
// --------------------------------------------------------------------------------

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.setFestivals = this.setFestivals.bind(this);
    this.setSelectedFestival = this.setSelectedFestival.bind(this);
  }

  state = {
    festivals: [], // get fetivals, 대신 불러온 데이터 하나하나에 유저 id를 삽입한다. Adder와 Remover때문, 그리고 각 페스티벌 아이디는 UserId라는 항목을 갖고있음.
    selectedFestival: {}
  };

  componentDidMount() {
    //컴포넌트 마운트 직후 바로 festival 데이터 fetching
    getAllFestivals(this.setFestivals);
  }

  //get해온 각 데이터에 유저 ID속성 추가 및 state에 새로운 데이터 추가.
  setFestivals(data) {
    this.setState({
      ...this.state,
      festivals: data
    });
  }
  //하나의 페스티벌을 고를 경우
  setSelectedFestival(item) {
    this.setState({
      ...this.state,
      selectedFestival: item
    });
  }

  render() {
    const user_Id = firebase.auth().currentUser.uid; //로그인 된 유저 ID
    return (
      <AppContainer
        screenProps={{
          festivals: this.state.festivals,
          user_Id: user_Id,
          selectedFestival: this.state.selectedFestival,
          setSelectedFestival: this.setSelectedFestival
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
