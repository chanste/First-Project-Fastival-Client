import React, { Component } from 'react'
import {View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import firebase from 'firebase'

 class LoadingScreen extends Component {
     componentDidMount() {
         this.checkIfLoggedIn();
     }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                this.props.navigation.navigate('Index') //이 부분을 현구님 부분에 연결
            }
            else{
                this.props.navigation.navigate('LoginScreen')
            }
        }.bind(this))
    }
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}
/*
사용자가 로그인 상태가 아니라면 currentUser 값이 null입니다.
var user = firebase.auth().currentUser;

if (user) {
  // User is signed in.
} else {
  // No user is signed in.
}
*/

export default LoadingScreen;

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})



