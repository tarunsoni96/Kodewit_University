import React, { Component } from "react";
import {
  View,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import { Colors } from "UIProps/Colors";
import Fonts from "UIProps/Fonts";
import Bottomsheet from "AppLevelComponents/UI/Bottomsheet";
import CustomText from "AppLevelComponents/UI/CustomText";
import CustomButton from "AppLevelComponents/UI/CustomButton";
import EStyleSheet from "react-native-extended-stylesheet";
import { Row, Grid, Col } from "react-native-easy-grid";
import Divider from "AppLevelComponents/UI/Divider";
import InfoItem from "../../../../../Profile/components/InfoItem";

let attachments = [
  { name: "Datesheet.pdf" },
  { name: "Examsheet.pdf" },
  { name: "Class schedule.pdf" },
  { name: "Leave schedule.pdf" },
  { name: "College timings.pdf" },
  { name: "College map.pdf" }
];

const Attachments = ({ attachmentName }) => {
  return (
    <CustomText
      text={attachmentName}
      style={{
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: "rgba(100,100,100,0.1)",
        padding: 10
      }}
      paddingHorizontal={10}
      color={Colors.accent}
      size={17}
      font={Fonts.regular}
    />
  );
};

export default class BottomsheetEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderAttachments = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.openBottomsheet(item)}>
        <View style={{ paddingVertical: 10, marginTop: 5 }}>
          <Attachments attachmentName={item.name} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  downloadAttachment = () => {};

  render() {
    const { content } = this.props;
    const { title, description } = content;
    return (
      <Bottomsheet>
        <View style={{ padding: 20, paddingBottom: 5, paddingTop: 10 }}>
          <View style={styles.container}>
            <View style={[styles.column, {}]}>
              <InfoItem title="Registeration Starts" info="24 May 2019" />
              <InfoItem title="Event Date" info="1 July 2019" />
              <InfoItem title="Talk Topic" info="Power of Industrial Design" />
            </View>

            <View style={[styles.column, {}]}>
              <InfoItem title="Registeration Ends" info="24 May 2019" />
              <InfoItem title="Registeration Fees" info="500 INR" />
              <InfoItem title="Venue" info="Bose Hall" />
            </View>
          </View>
          <CustomButton
            onPress={this.downloadAttachment}
            text="DOWNLOAD ATTACHMENT"
            isApiCall={this.state.isApiCall}
          />
        </View>
      </Bottomsheet>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  container: {
    width: "100%",
    paddingBottom: 25,
    flexDirection: "row",
    alignItems: "center"
  },

  column: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    padding: 10,
    paddingRight: 0
  },

  infoContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center"
  },

  colRight: {
    paddingLeft: 60,
    height: "100%"
  }
});
