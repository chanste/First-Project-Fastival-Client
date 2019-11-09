import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import firebase from "firebase";

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{ width: 400, height: 400, resizeMode : "contain" }}
          source={{ uri: this.props.screenProps.selectedFestival.map_url }}
        />
      </View>
    );
  }
}

/*
<Image
 style={{width: 50, height: 50}}
source={{uri: getMap()}}
/>
*/

export default Map;
