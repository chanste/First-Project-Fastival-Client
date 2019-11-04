import React from "react";
import { Platform, View, KeyboardAvoidingView } from "react-native";
import PropTypes from "prop-types";
import { GiftedChat } from "react-native-gifted-chat";
import emojiUtils from "emoji-utils";
import firebase from "firebase";
import SlackMessage from "../Eachcomponents/SlackMessage";

export default class Chatbox extends React.Component {
  state = {
    messages: []
  };

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        },
        {
          _id: 3,
          text: "I'm not fine at all",
          createdAt: new Date(),
          user: {
            _id: 4,
            name: "brian"
          }
        },
        {
          _id: 5,
          text: "what is happening now",
          createdAt: new Date(),
          user: {
            _id: 6,
            name: "steve"
          }
        }
      ]
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
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
    // console.log(this.state);
    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
            name : 'hyung chan'
          }}
          renderMessage={this.renderMessage}
        />
        {Platform.OS === "android" && (
          <KeyboardAvoidingView behavior="padding" 
          keyboardVerticalOffset="30"/>
        )}
      </View>
    );
  }
}


