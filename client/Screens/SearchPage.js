import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  Alert
} from "react-native";
import Adder from "../Eachcomponents/Adder";
import firebase from "firebase";

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.textSearching = this.textSearching.bind(this);
  }

  state = {
    search: "",
    datas: [],
    currDatas: [],
    cart: [],
    userFestival: [],
    userId: ""
  };

  //검색어 입력시 검색창 state  변경
  _updateSearch = search => {
    this.setState({ search });
    this.textSearching(search);
  };

  componentDidMount() {
    //컴포넌트 로드 완료 후 _updateSearch함수를 updateSearch라는 이름으로 네비게이션의 param으로 등록.
    this.props.navigation.setParams({
      updateSearch: this._updateSearch
    });
    this.setState({
      ...this.state,
      datas: this.props.screenProps.festivals,
      currDatas: this.props.screenProps.festivals,
      user_Id: this.props.screenProps.user_Id
    });
    this.textSearching();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => (
        <TextInput
          placeholder="Find more Festivals"
          onChangeText={navigation.getParam("updateSearch")} //네비게이션 param으로 등록되어있는 _updateSearch함수를 불러온다.
          style={{ width: 328, height: 30 }}
        />
      )
    };
  };

  //검색어에 맞는 페스티벌 필터링
  textSearching(text) {
    let currDatas = this.props.screenProps.festivals;
    let filteredList = currDatas.filter(item => {
      if (item.name.search(text) !== -1) {
        return true;
      }
    });
    this.setState({
      ...this.state,
      currDatas: filteredList
    });
  }

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
          style={{
            fontSize: 15,
            fontWeight: "600",
            marginRight: 10,
            marginLeft: 10,
            opacity: 0.6,
            width: 300
          }}
          onPress={() => Alert.alert("자세한 정보", "null")}
        >
          {item.name}
        </Text>
        <Adder festival_Id={item.festival_Id} user_Id={uId} />
      </View>
    );
  }

  render() {
    const datas = this.state.currDatas;
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <FlatList
          data={datas}
          renderItem={this.Item}
          keyExtractor={item => {
            return "" + item.festival_Id; // this must be string
          }}
          extraData={this.state}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
