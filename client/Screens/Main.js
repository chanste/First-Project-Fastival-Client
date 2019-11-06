import React, { Component } from "react";
import { StyleSheet, View, Button, FlatList, Text, Image } from "react-native";
import SearchPage from "./SearchPage";
import UserConcert from "./UserConcert";
import Remover from "../Eachcomponents/Remover";

import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import firebase from 'firebase'
import { getAllFestivals, getUserFestivals } from "../Fetch/Fetches";
import Index from "../Eachcomponents/Index";

//Get=[{festival_Id: int, name: str, img_url: str}, {data2}, {data3}, ....]
class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this._toSearchPage = this._toSearchPage.bind(this);
    this.setUserFestivals = this.setUserFestivals.bind(this);
    this.Item = this.Item.bind(this);
    this.selectFestival = this.selectFestival.bind(this);
    this.refresh = this.refresh.bind(this)
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
    userFestivals: [] 
  };

  refresh(){
    getUserFestivals(this.props.screenProps.user_Id, this.setUserFestivals);
  }

  _toSearchPage() {
    this.props.navigation.navigate(`SearchPage`);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      toSearchPage: this._toSearchPage
    });   
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      getUserFestivals(this.props.screenProps.user_Id, this.setUserFestivals);
    });
  }

  //유저 festivalList 정보를 불러오고, state 업데이트
  setUserFestivals(data) {
    // console.log("data before setstate", data)
    this.setState({
      ...this.state,
      userFestivals: data
    });
    // console.log("let's see the state after setting", this.state)
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
      <View style={{ marginTop: 10 }}>
        <View style={{}}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 20 }}
            source={{ uri: item.img_url }} //일단 map_url로 사용
          />
          <Text
            onPress={() => this.selectFestival(item)}
            style={{ fontSize: 20, fontWeight: "600"}}
          >
            {item.name}
          </Text>
        </View>
        <Remover festival_Id={item.festival_Id} user_Id={uId} refresh={item.refresh}/>
      </View>
    );
  }

  render() {
    const datas = this.state.userFestivals;
    for(const item of datas){
      item.refresh = this.refresh
    }
    return (
      <View>
        {this.state.userFestivals.length === 0 ? (
          <Button
            title="Add Your Festivals"
            onPress={() => this._toSearchPage()}
          />
        ) : (
          <View style={{}}>
            <View style={{}}>
              <View>
                <Text
                  style={{ marginTop: 20, fontSize: 30, fontWeight: "700" }}
                > 
                  My Festival List
                </Text>
              </View>
              <FlatList
                data={datas}
                renderItem={this.Item}
                keyExtractor={item => {
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

//async스토리지??(리액트 로컬 스토리지)


const AppStackNavigator = createStackNavigator(
  {
    Main: MainScreen, //장바구니 
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
// ------------------------------------------------------------------------------

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
          setSelectedFestival: this.setSelectedFestival,
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