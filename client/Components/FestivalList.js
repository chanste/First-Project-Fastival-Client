import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import Remover from "../Components/Remover";

// const dummyData = [
//   { festival_Id: 1, name: "첫 페스티벌" },
//   { festival_Id: 2, name: "두번째 페스티벌" }
// ];

export default class FestivalList extends Component {
  constructor(props) {
    super(props);
    this.Item = this.Item.bind(this);
    this.selectMyFestival = this.selectMyFestival.bind(this);
  }

  state = { currdata: [] };

  componentDidMount() {
    this.setState({
      ...this.state,
      currdata: this.props.userFestivals
    });
  } //get Datas for my FestivalList.

  Item({ item }) {
    return (
      <View style={{ marginTop: 10 }}>
        <View style={{}}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 20 }}
            source={{ uri: item.img_url }}
          />
          <Text
            onPress={this.selectMyFestival}
            style={{ fontSize: 20, fontWeight: "600" }}
          >
            {item.name}
          </Text>
        </View>
        <Remover festival_Id={item.festival_Id} user_Id={item.user_Id} />
      </View>
    );
  }

  selectMyFestival() {
    alert("페스티벌 페이지로 이동!");
  }

  render() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 100
        }}
      >
        <View>
          <Text style={{ marginTop: 20, fontSize: 30, fontWeight: "700" }}>
            My Festival List
          </Text>
        </View>
        <FlatList
          data={this.state.currdata}
          renderItem={this.Item}
          keyExtractor={item => {
            // console.log("keyExtractor: ", item);
            return "" + item.festival_Id; // this must be string
          }}
        />
      </View>
    );
  }
}
