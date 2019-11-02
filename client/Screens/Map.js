import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

class Map extends React.Component {

  // getMap = async () => {

  //   let mapUrl = await window
  //     .fetch("http://3.133.96.196:5000/festivals?user-id ", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     })
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(json => {
  //       return json.map_url;
  //     });
  //   return mapUrl;

  // };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Map!!!!!!!!</Text>
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
