import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image
} from "react-native";
import Adder from "../Components/Adder";

//Get [{festival_Id: int, name: str, img_url: str}, {data2}, {data3}, ....]

var timer;

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
    userId: 0
  };

  _updateSearch = search => {
    this.setState({ search });
    // console.log(search);
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
      userId: this.props.screenProps.userId
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

    // console.log("currDatas: ", currDatas);

    let filteredList = currDatas.filter(item => {
      // console.log("item: ", item);
      if (item.name.search(text) !== -1) {
        return true;
      }
    });

    // console.log("filteredList: ", filteredList);

    this.setState({
      ...this.state,
      currDatas: filteredList
    });
  }

  Item({ item }) {
    return (
      <View style={{ marginTop: 30 }}>
        {/* {console.log("SearchPage Item: ", item)} */}
        <Image
          style={{ width: 100, height: 100, borderRadius: 10 }}
          source={{ uri: item.img_url }}
        />
        <Text style={{ fontSize: 20 }} onPress={() => alert("자세한 정보")}>
          {item.name}
        </Text>
        <Adder festival_Id={item.festival_Id} user_Id={item.user_Id} />
      </View>
    );
  }

  render() {
    // console.log("myFestivalFunc: ", this.props.screenProps);
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
        />
      </View>
    );
    // console.log("searchValue: ", searchValue);
  }
}

const styles = StyleSheet.create({});
