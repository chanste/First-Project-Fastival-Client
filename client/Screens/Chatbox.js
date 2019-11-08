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
    this.socket = io.connect  ("http://3.133.96.196:5000/msg/1")
    this.socket.on('chat', msg => {
      const newMsg = [];
      for(let i =0; i<msg.length; i++){
        let eachItem = { ...msg[i] }
        eachItem.user = msg[i].User
        eachItem._id = msg[i].id
        delete eachItem.User
        delete eachItem.id
        newMsg.unshift(eachItem)
      }
      console.log("#########", newMsg)
      this.setState({
        ...this.state,
        messages : newMsg
      })
      console.log("@@@@@@@@@@", this.state) 
    })
    //서버측에서 구현되어야 할 부분
    //1. 처음 connect될때 roomname에 맞게 분류, 동시에 roomname에 해당하는 모든 채팅 내역 클라이언트로 emit
    //2. 그 이후로 서버한테 chat 이벤트명으로 on받을 때마다 기존 채팅 내역에 업데이트 하고 갱신된 채팅 내역 emit
  }   

  // I sent! Object {
  //   "_id": "9f51b617-a593-4dba-9cfb-24fad199cdc2",
  //   "createdAt": 2019-11-08T08:25:56.833Z,
  //   "text": "?!?!",
  //   "user": Object {
  //     "_id": "BS860jF3lLU21x4bJ6QWbfzTppG3",
  //     "avatar": "https://lh4.googleusercontent.com/-QtcmeHny-8A/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rc2m9HPxsYf7yuPm_tE60G8uyKOwA/s96-c/photo.jpg",
  //     "name": "st ch",
  //   },
  // }

  // {
  //   "_id": "63c29299-5045-4673-adc5-fe93de1650e8",
  //   "createdAt": 2019-11-08T05:49:27.582Z,
  //   "text": "Mm",
  //   "user": Object {
  //     "_id": "BS860jF3lLU21x4bJ6QWbfzTppG3",
  //     "avatar": "https://lh4.googleusercontent.com/-QtcmeHny-8A/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rc2m9HPxsYf7yuPm_tE60G8uyKOwA/s96-c/photo.jpg",
  //     "name": "st ch",
  //   },
  // }
  
  onSend(messages = []) {
    this.socket.emit('chat', messages[0])
    console.log("I sent!", messages[0])
    
    this.socket.on('chat', msg => {
      const newMsg = [];
      for(let i =0; i<msg.length; i++){
        let eachItem = { ...msg[i] }
        eachItem.user = msg[i].User
        eachItem._id = msg[i].id
        delete eachItem.User
        delete eachItem.id
        newMsg.unshift(eachItem)
      }
      console.log("#########", newMsg)
      this.setState({
        ...this.state,
        messages : newMsg
      })
    })
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages)
    // }));
  }

  c
  
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
    
    const userId = firebase.auth().currentUser.uid
    const userName = firebase.auth().currentUser.displayName;
    const photoUrl = firebase.auth().currentUser.photoURL;

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
