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
import InfoItem from "../../../../Profile/components/InfoItem";
import HelperMethods from "../../../../../Helpers/Methods";
import DownloadButton from "../../../../../AppLevelComponents/UI/DownloadButton";

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
        <View style={{padding:10}}>

      <View style={styles.titleContainer} >

        <CustomText
            text={content.event_name}
            singleLine
            
            size={18}
            color="rgba(0,0,0,1)"
            font={Fonts.heavy}
            />

      <CustomText
              text={`Created: ${HelperMethods.formatDate_DMY(content.created_at)}`}
              size={12}
              textAlign='right'
              color="rgba(0,0,0,0.6)"
              font={Fonts.medium}
              />
      </View>

        </View>
          <View style={styles.container}>
            <View style={[styles.column, {}]}>
              {/* <InfoItem title="Registeration Starts" info="24 May 2019" /> */}
              <InfoItem title="Event Date" info={HelperMethods.formatDate_DMY(content.event_date_time)} />
              {/* <InfoItem title="Talk Topic" info="Power of Industrial Design" /> */}
            </View>

            <View style={[styles.column, {}]}>
              {/* <InfoItem title="Registeration Ends" info="24 May 2019" /> */}
              {/* <InfoItem title="Registeration Fees" info="500 INR" /> */}
              {/* <InfoItem title="Venue" info="Bose Hall" /> */}
            </View>
          </View>
          {content.file_path && 
            <DownloadButton />
          }
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
  },

  titleContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
  }
});
