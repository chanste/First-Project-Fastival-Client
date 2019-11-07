import React from "react";
import { Platform, View, KeyboardAvoidingView } from "react-native";
import PropTypes from "prop-types";
import { GiftedChat } from "react-native-gifted-chat";
import emojiUtils from "emoji-utils";
import firebase from "firebase";
import SlackMessage from "../Eachcomponents/SlackMessage";
import io from "socket.io-client";

//onSend
//1. 메세지를 보내줌(user_Id 필요)

export default class Chatbox extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      messages : []
    }
  }
  state = {
    messages: []
  };
 
  componentDidMount () {
    this.socket = io("http://3.133.96.196:5000/msg/" + this.props.screenProps.selectedFestival.festival_Id)
    this.socket.on("chat", msg => {
      this.setState({
        ...this.state,
        mseeages : msg
      })
    })
    //1. socket.io를 통해 서버와 연결
    //2. 서버에서 message를 가져와서 render
  }

  //서버랑 연동해서 메세지를 받아오고 그걸로 state 초기화
  onSend(messages = []) {
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages)
    // }));
    this.socket.emit("chat", messages)
  }

  renderMessage(props) {
    const {
      currentMessage: { text: currText }
    } = props;
    let messageTextStyle;
    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === "android" ? 34 : 30
      };
    }
    return <SlackMessage {...props} messageTextStyle={messageTextStyle} />;
  }

  render() {
    const userId = firebase.auth().currentUser.uid;
    const userName = firebase.auth().currentUser.name;
    const photoUrl = firebase.auth().currentUser.photoUrl;

    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: userId,
            name: userName,
            avatar: photoUrl
          }}
          renderMessage={this.renderMessage}
        />
        {Platform.OS === "android" && (
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset="30"
          />
        )}
      </View>
    );
  }
}
