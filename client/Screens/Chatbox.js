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
    this.socket = io("http://3.133.96.196:5000/msg/" + this.props.screenProps.selectedFestival.festival_Id) //이부분
    this.socket.on("chat", msg => {
      this.setState({
        ...this.state,
        mseeages : msg
      })
    })
    //서버측에서 구현되어야 할 부분
    //1. 처음 connect될때 roomname에 맞게 분류, 동시에 roomname에 해당하는 모든 채팅 내역 클라이언트로 emit
    //2. 그 이후로 서버한테 chat 이벤트명으로 on받을 때마다 기존 채팅 내역에 업데이트 하고 갱신된 채팅 내역 emit
  }

  
  onSend(messages = []) {
    this.socket.emit("chat", messages)
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages)
    // }));
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
