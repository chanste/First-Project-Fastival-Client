import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image
} from "react-native";
import Adder from "../Eachcomponents/Adder";
import firebase from "firebase";

//Get [{festival_Id: int, name: str, img_url: str}, {data2}, {data3}, ....]

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.textSearching = this.textSearching.bind(this);
  }

  state = {
    // search: this.props.searchValue
    search: "",
    datas: [],
    currDatas: [],
    cart: [],
    userFestival: [],
    userId: ""
  };

  _updateSearch = search => {
    this.setState({ search });
    this.textSearching(search);
  };

  componentDidMount() {
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
          onChangeText={navigation.getParam("updateSearch")}
          style={{ width: 350, height: 30 }}
        />
      )
    };
  };

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
          style={{ width: 60, height: 60, borderRadius: 20 }}
          source={{ uri: item.img_url }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            marginRight: 10,
            marginLeft: 10,
            opacity: 0.6,
            width: 250
          }}
          onPress={() => alert("자세한 정보")}
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
