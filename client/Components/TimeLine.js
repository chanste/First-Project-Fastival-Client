import React, { Component } from "react";
import {
  StyleSheet,
  ListView,
  Image,
  View,
  Text,
  TouchableOpacity,
  Button
} from "react-native";

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

const defaultCircleSize = 16;
const defaultCircleColor = "#007AFF";
const defaultLineWidth = 2;
const defaultLineColor = "#007AFF";
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

    this.state = {
      data: this.props.data,
      dataSource: ds.cloneWithRows(this.props.data),
      x: 0,
      width: 0,
      stage: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      dataSource: ds.cloneWithRows(nextProps.data)
    });
  }

  render() {
    // console.log("ListProps: ", this.props.data[0].stage);
    return (
      <View style={[styles.container, this.props.style]}>
        <Text
          style={{
            justifyContent: "center",
            alignItems: "center",
            fontSize: 20
          }}
        >
          Stage {this.props.data[0].stage}
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
      <View key={rowID} style={this.props.rowContainerStyle}>
        <View style={[styles.rowContainer]}>
          {this.renderTime(rowData, sectionID, rowID)}
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
          <Text style={[styles.starttime, this.props.timeStyle]}>
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
      marginLeft: 20,
      paddingLeft: 20
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
          style={{ backgroundColor: "#ff0000", marginTop: 5 }}
        >
          <View style={styles.detail}>
            {this.renderDetail(rowData, sectionID, rowID)}
          </View>
          {this.props.addButton ? (
            <Button title="Add" onPress={() => alert("post요청")} />
          ) : (
            <Text></Text>
          )}
          {this._renderSeparator()}
        </TouchableOpacity>
      </View>
    );
  }

  _renderDetail(rowData, sectionID, rowID) {
    const artistName = rowData.artist;
    const description = rowData.description;
    let artist = (
      <View>
        <Text
          style={[styles.artist, this.props.titleStyle]}
          onPress={() => alert(description)}
        >
          {artistName}
        </Text>
        {/* <Text style={[styles.description, this.props.descriptionStyle]}>
          {rowData.description}
        </Text> */}
      </View>
    );
    return <View style={styles.container}>{artist}</View>;
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
}

TimeLine.defaultProps = {
  circleSize: defaultCircleSize,
  circleColor: defaultCircleColor,
  lineWidth: defaultLineWidth,
  lineColor: defaultLineColor,
  innerCircle: defaultInnerCircle,
  columnFormat: "single-column-left",
  separator: false,
  showTime: true
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listview: {
    flex: 1
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
    flex: 1,
    //alignItems: 'stretch',
    justifyContent: "center"
  },
  timeContainer: {
    minWidth: 45
  },
  starttime: {
    textAlign: "right",
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
  }
});
