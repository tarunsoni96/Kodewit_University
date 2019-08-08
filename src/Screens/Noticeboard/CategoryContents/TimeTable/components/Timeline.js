import React, { Component } from "react";
import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import CustomText from "AppLevelComponents/UI/CustomText";
import Divider from "AppLevelComponents/UI/Divider";
import { Colors } from "UIProps/Colors";
import moment from "moment";
import Fonts from "UIProps/Fonts";

let hourHeight = 74;
let horizSpacing = 20;
export default class Timeline extends Component {
  renderHours() {
    const { timelineData } = this.props;

    let times = [];
    let view = [];
    let lastTime;
    let lectureLength
    let subject
    let time = timelineData[0].time;
    for (let i = 0, len = timelineData.length; i < len; i++) {
      lectureLength = timelineData[i].lectureLength;
      subject = timelineData[i].subject;
      for (let j = 0, len = lectureLength; j < len; j++) {
        times.push(
          <View style={styles.time}>
            <CustomText
              padding={0}
              paddingHorizontal={horizSpacing}
              font={Fonts.heavy}
              size={13}
              text={
                time != lastTime
                  ? time.charAt(1) == ":"
                    ? `0${time.toString()}`
                    : time.toString()
                  : "               "
              }
              color="#707270"
            />
            {j < 1 && (
              <View style={{ flex: 1 }}>
                <Divider
                  style={{ marginRight: horizSpacing - 10, height: 1, flex: 0 }}
                />
                <View
                  style={[
                    styles.lectureBlock,
                    { height: hourHeight * lectureLength - 10 }
                  ]}
                >
                  <CustomText
                    text={subject}
                    size={14}
                    color="#000"
                    font={Fonts.heavy}
                  />
                </View>
              </View>
            )}
          </View>
        );

        lastTime = time;

        time = moment(
          time,
          "HH:mm"
        )
          .add(lectureLength == 2 ? lectureLength : 1, "hours")
          .format("HH:mm A");
      }
      if (lectureLength >= 2) {
        time = moment(time, "HH:mm")
        .subtract(lectureLength == 2 ? lectureLength : 1, "hours")
        .format("HH:mm A");
      }
        if(i == timelineData.length - 1 && lectureLength == 1){
          times.push(
            <View style={[styles.time,{alignItems:'center',marginTop:38}]}>
              <CustomText
                padding={0}
                paddingHorizontal={horizSpacing}
                font={Fonts.heavy}
                size={13}
                text={
                  time
                }
                color="#707270"
              />
                <View style={{ flex: 1 }}>
                  <Divider
                    style={{ marginRight: horizSpacing - 10, height: 1, flex: 0 }}
                  />
                  </View>
                  </View>
          )
        }
      view.push(
        <View
          style={[
            styles.container,
            {
              height: hourHeight * lectureLength,
              justifyContent: "space-between"
            }
          ]}
        >
          {times}
        </View>
      );

      times = [];
    }
    return view;
  }
  render() {
    return <>{this.renderHours()}</>;
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  container: {
    width: "100%",
    alignItems: "flex-start"
    // marginTop: 20
  },

  time: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  lectureBlock: {
    width: "97%",
    position: "absolute",
    top: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#dedede"
  }
});
