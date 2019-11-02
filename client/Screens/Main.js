import React, { Component } from "react";
import { StyleSheet, View, Button } from "react-native";
import FestivalList from "../Components/FestivalList";
import SearchPage from "./SearchPage";

import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { getAllFestivals, getUserFestivals } from "../Fetch/Fetches";

//Get=[{festival_Id: int, name: str, img_url: str}, {data2}, {data3}, ....]
class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this._toSearchPage = this._toSearchPage.bind(this);
    this.setUserFestivals = this.setUserFestivals.bind(this);
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
    userFestivals: [],
    user_Id: 0
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

  render() {
    const userFestivals = this.state.userFestivals;
    return (
      <View>
        {this.state.userFestivals.length === 0 ? (
          <Button
            title="Add Your Festivals"
            onPress={() => this._toSearchPage()}
          />
        ) : (
          <FestivalList userFestivals={userFestivals} />
        )}
      </View>
    );
  }
}

const AppStackNavigator = createStackNavigator(
  {
    Main: MainScreen,
    SearchPage: SearchPage,
  },
  { initialRouteName: "Main" }
);

const AppContainer = createAppContainer(AppStackNavigator);

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.setFestivlas = this.setFestivlas.bind(this);
  }

  state = {
    userFestivals: [], // user_ID와 festival_ID가 매칭되는 festival 데이터 스키마를 불러온다.
    festivals: [], // get fetivals, 대신 불러온 데이터 하나하나에 유저 id를 삽입한다. Adder와 Remover때문, 그리고 각 페스티벌 아이디는 UserId라는 항목을 갖고있음.
    user_Id: 0 //로그인 된 유저 ID
  };

  componentDidMount() {
    //컴포넌트 마운트 직후 바로 festival 데이터 fetching
    getAllFestivals(this.setFestivlas);
  }

  //get해온 각 데이터에 유저 ID속성 추가 및 state에 새로운 데이터 추가.
  setFestivlas(data) {
    const newFestivals = data.slice();
    for (let i = 0; i < newFestivals.length; i++) {
      newFestivals[i].user_Id = this.state.user_Id;
    }
    this.setState({
      ...this.state,
      festivals: newFestivals
    });
  }

  render() {
    return (
      <AppContainer
        screenProps={{
          festivals: this.state.festivals,
          user_Id: this.state.user_Id
        }}
      />
    );
  }
}

const styles = StyleSheet.create({});
