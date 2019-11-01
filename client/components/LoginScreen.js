import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";

class LoginScreen extends Component {
  //firebase에 있는 유저와 구글을 통해 로그인하려는 유저가 동일한지 확인
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          return true;
        }
      }
    }
    return false;
  };

  //로그인할 경우 데이터베이스에 유저데이터 POST 요청
  onSignIn = googleUser => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInAndRetrieveDataWithCredential(credential)
            .then(function(result) {
              console.log("user signed in ", result);
              if (result.additionalUserInfo.isNewUser) {
                //데이터베이스에 없는 유저가 접속을 한 경우
                // firebase
                // .database()
                // .ref('/users/' + result.user.uid)
                // .set({
                //     gmail : result.user.email,
                //     profile_picture : result.additionalUserInfo.profile.picture,
                //     locale : result.additionalUserInfo.profile.locale,
                //     first_name : result.additionalUserInfo.profile.given_name,
                //     last_name : result.additionalUserInfo.family_name,
                //     created_at : Date.now()
                // })
                // .then(function(snapshot){
                //     //console.log('snapshot', snapshot)
                // })
              } else {
                //데이터베이스에 있는 유저가 접속을 한 경우
                //last-logged-in을 추가해줌
                // firebase
                // .database()
                // .ref('/users/' + result.user.uid).update({
                //     last_logged_in : Date.now()
                // })
              }
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      }.bind(this)
    );
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: "secret",
        scopes: ["profile", "email"]
      });
      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Sign In With Google"
          onPress={() => this.signInWithGoogleAsync()}
        />
      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});