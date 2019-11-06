import React, { Component } from "react";
import {
  StyleSheet,
  ListView,
  Image,
  View,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
import { addUserConcert, deleteUserConcert } from "../Fetch/Fetches";

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

const defaultCircleSize = 16;
const defaultCircleColor = "#FFBF00";
const defaultLineWidth = 2;
const defaultLineColor = "#D9DDDC";
const defaultTimeTextColor = "black";
const defaultDotColor = "white";
const defaultInnerCircle = "none";

export default class TimeLine extends Component {
  constructor(props) {
    super(props);

    this._renderRow = this._renderRow.bind(this);
    this.renderTime = this._renderTime.bind(this);
    this.renderDetail = this._renderDetail.bind(this);
    this.renderCircle = this._renderCircle.bind(this);
    this.renderEvent = this._renderEvent.bind(this);
    this._timeGapCalculator = this._timeGapCalculator.bind(this);
    this._dynamicLineLength = this._dynamicLineLength.bind(this);
    this._showConcertInfos = this._showConcertInfos.bind(this);

    this.state = {
      data: this.props.data,
      dataSource: ds.cloneWithRows(this.props.data),
      x: 0,
      width: 0,
      stage: "",
      user_Id: this.props.user_Id
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      dataSource: ds.cloneWithRows(nextProps.data)
    });
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Text
          style={{
            justifyContent: "center",
            alignItems: "center",
            fontSize: 19,
            marginBottom: 15,
            marginLeft: 15,
            width: 200
          }}
        >
          {this.props.data[0].stage}
        </Text>
        <ListView
          ref="listView"
          style={[styles.listview, this.props.listViewStyle]}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          automaticallyAdjustContentInsets={false}
          {...this.props.options}
        />
      </View>
    );
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <View key={rowID} style={styles.rowContainerStyle}>
        <View style={[styles.rowContainer]}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {this.renderTime(rowData, sectionID, rowID)}
          </View>
          {this.renderEvent(rowData, sectionID, rowID)}
          {this.renderCircle(rowData, sectionID, rowID)}
        </View>
      </View>
    );
  }

  _renderTime(rowData, sectionID, rowID) {
    if (!this.props.showTime) {
      return null;
    }
    return (
      <View style={{ alignItems: "flex-end" }}>
        <View style={[styles.timeContainer, this.props.timeContainerStyle]}>
          <Text style={[styles.time, this.props.timeStyle]}>
            {rowData.starttime}
            {`\n`}~{`\n`}
            {rowData.endtime}
          </Text>
        </View>
      </View>
    );
  }

  _renderEvent(rowData, sectionID, rowID) {
    const lineWidth = this.props.lineWidth;
    const isLast = this.props.renderFullLine
      ? !this.props.renderFullLine
      : this.state.data.slice(-1)[0] === rowData;
    const lineColor = this.props.lineColor;
    let opStyle = {
      borderColor: lineColor,
      borderLeftWidth: lineWidth,
      borderRightWidth: 0,
      marginLeft: 10,
      paddingLeft: 10
    };

    return (
      <View
        style={[styles.details, opStyle]}
        onLayout={evt => {
          if (!this.state.x && !this.state.width) {
            const { x, width } = evt.nativeEvent.layout;
            this.setState({ x, width });
          }
        }}
      >
        <TouchableOpacity
          disabled={this.props.onEventPress == null}
          style={{ marginTop: 5 }}
        >
          <View style={styles.detail}>
            {this.renderDetail(rowData, sectionID, rowID)}
          </View>
          {this._renderSeparator()}
        </TouchableOpacity>
      </View>
    );
  }

  _renderDetail(rowData, sectionID, rowID) {
    const artistName = rowData.artist;
    const description = rowData.description;
    const timeGap = this._timeGapCalculator(rowData);

    let concertRow = (
      <View style={{}}>
        {timeGap > 40 ? <Text style={styles.gap}></Text> : null}
        {timeGap > 36 ? <Text style={styles.gap}></Text> : null}
        {timeGap > 32 ? <Text style={styles.gap}></Text> : null}
        {timeGap > 28 ? <Text style={styles.gap}></Text> : null}
        {timeGap > 24 ? <Text style={styles.gap}></Text> : null}
        {timeGap > 20 ? <Text style={styles.gap}></Text> : null}
        {timeGap > 16 ? <Text style={styles.gap}></Text> : null}
        {timeGap > 12 ? <Text style={styles.gap}></Text> : null}
        {timeGap > 8 ? <Text style={styles.gap}></Text> : null}
        {timeGap > 4 ? <Text style={styles.gap}></Text> : null}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: 15,
              width: 90
            }}
            onPress={() => this._showConcertInfos(artistName, description)}
          >
            {artistName.length > 6
              ? artistName.slice(0, 5) + "..."
              : artistName}
          </Text>
          {this.props.addButton ? (
            <TouchableOpacity
              onPress={() => {
                addUserConcert(this.state.user_Id, rowData.concert_Id);
                Alert.alert("", "콘서트가 추가되었습니다.");
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  paddingLeft: 5,
                  paddingRight: 5
                }}
              >
                ➕
              </Text>
            </TouchableOpacity>
          ) : (
            <Text></Text>
          )}
          {this.props.removeButton ? (
            <TouchableOpacity
              onPress={() => {
                deleteUserConcert(this.state.user_Id, rowData.concert_Id);
                Alert.alert(`콘서트가 삭제되었습니다.`);
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  paddingLeft: 5,
                  paddingRight: 5
                }}
              >
                ⛔
              </Text>
            </TouchableOpacity>
          ) : (
            <Text></Text>
          )}
        </View>
        {timeGap > 40 ? <Text style={styles.gap}></Text> : null}
        {timeGap > 36 ? <Text style={styles.gap}></Text> : null}
        {timeGap > 32 ? <Text style={styles.gap}></Text> : null}
        {timeGap > 28 ? <Text style={styles.gap}></Text> : null}
        {timeGap > 24 ? <Text style={styles.gap}></Text> : null}
        {timeGap > 20 ? <Text style={styles.gap}></Text> : null}
        {timeGap > 16 ? <Text style={styles.gap}></Text> : null}
        {timeGap > 12 ? <Text style={styles.gap}></Text> : null}
        {timeGap > 8 ? <Text style={styles.gap}></Text> : null}
        {timeGap > 4 ? <Text style={styles.gap}></Text> : null}
      </View>
    );
    return <View style={styles.container}>{concertRow}</View>;
  }

  _renderCircle(rowData, sectionID, rowID) {
    var circleSize = defaultCircleSize;
    var circleColor = defaultCircleColor;
    var lineWidth = defaultLineWidth;
    var circleStyle = {
      width: this.state.x ? circleSize : 0,
      height: this.state.x ? circleSize : 0,
      borderRadius: circleSize / 2,
      backgroundColor: circleColor,
      left: this.state.x - circleSize / 2 + (lineWidth - 1) / 2
    };

    let dotStyle = {
      height: circleSize / 2,
      width: circleSize / 2,
      borderRadius: circleSize / 4,
      backgroundColor: defaultDotColor
    };
    var innerCircle = <View style={[styles.dot, dotStyle]} />;

    return (
      <View style={[styles.circle, circleStyle, this.props.circleStyle]}>
        {innerCircle}
      </View>
    );
  }

  _renderSeparator() {
    if (!this.props.separator) {
      return null;
    }
    return <View style={[styles.separator, this.props.separatorStyle]} />;
  }

  _timeGapCalculator(concertData) {
    let startHour = (Number(concertData.starttime.slice(0, 2)) / 24) * 100;
    let startMinute = Number(concertData.starttime.slice(3)) / 60;
    let endHour = (Number(concertData.endtime.slice(0, 2)) / 24) * 100;
    let endMinut = Number(concertData.endtime.slice(3)) / 60;

    let startTime = startHour + startMinute;
    let endTime = endHour + endMinut;

    return Math.abs(endTime - startTime);
  } //ratio 24h = 100%

  _dynamicLineLength(timeGap) {}

  _showConcertInfos(artistName, description) {
    Alert.alert(
      "공연정보",
      `공연 아티스트:${artistName}\n\n설명:${description}`
    );
  }
}

TimeLine.defaultProps = {
  circleSize: defaultCircleSize,
  circleColor: defaultCircleColor,
  lineWidth: defaultLineWidth,
  lineColor: defaultLineColor,
  innerCircle: defaultInnerCircle,
  separator: false,
  showTime: true
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listview: {
    // flex: 1
  },
  sectionHeader: {
    marginBottom: 15,
    backgroundColor: "#007AFF",
    height: 30,
    justifyContent: "center"
  },
  sectionHeaderText: {
    color: "#FFF",
    fontSize: 18,
    alignSelf: "center"
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center"
    // flex: 1,
  },
  rowContainerStyle: {},

  timeContainer: {
    minWidth: 45
  },
  time: {
    textAlign: "center",
    color: defaultTimeTextColor
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 10,
    position: "absolute",
    left: -8,
    alignItems: "center",
    justifyContent: "center"
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: defaultDotColor
  },
  artist: {
    fontSize: 16,
    fontWeight: "bold"
  },
  details: {
    borderLeftWidth: defaultLineWidth,
    flexDirection: "column",
    flex: 1
  },
  detail: { paddingTop: 10, paddingBottom: 10 },
  description: {
    marginTop: 10
  },
  separator: {
    height: 1,
    backgroundColor: "#aaa",
    marginTop: 10,
    marginBottom: 10
  },
  gap: {
    fontSize: 10
  }
});
