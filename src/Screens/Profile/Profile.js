import React, { Component } from "react";
import { Text, View, StatusBar, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";
import Container from "AppLevelComponents/UI/Container";
import Logo from "AppLevelComponents/UI/Logo";
import { Colors } from "UIProps/Colors";
import EStyleSheet from "react-native-extended-stylesheet";
import CustomText from "AppLevelComponents/UI/CustomText";
import CustomButton from "AppLevelComponents/UI/CustomButton";
import Divider from "AppLevelComponents/UI/Divider";
import Header from "AppLevelComponents/UI/Header";
import SubHeader from "../../AppLevelComponents/UI/SubHeader";
import Fonts from "UIProps/Fonts";
import Email from "AppLevelComponents/UI/FormInputs/Email";
import Password from "AppLevelComponents/UI/FormInputs/Password";
import ProfilePic from "AppLevelComponents/UI/ProfilePic";
import Constants from "Helpers/Constants";
import ProfileLabel from "./components/ProfileLabel";
import InfoItem from "./components/InfoItem";
import { Row, Grid, Col } from "react-native-easy-grid";
export class Profile extends Component {
  render() {
    return (
      <Container padding={0}>
        <Header>
          <View>
            <SubHeader type={Constants.header_back_middle_right} />
            <View style={styles.headerContent}>
              <ProfilePic
              showCameraIcon
                style={{ marginTop: 10 }}
                size={80}
                pic="https://images.pexels.com/photos/1877913/pexels-photo-1877913.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              />
              <CustomText
                text="Winnie singh"
                style={{ marginVertical: 8 }}
                color={Colors.black}
                font={Fonts.heavy}
              />
              <ProfileLabel />
            </View>
          </View>
        </Header>
        <ScrollView contentContainerStyle={{ width: "100%" }}>
          <Grid
            style={{
              alignItems: "center",
              padding: 40,
              flex: 1,
              width: "100%"
            }}
          >
            <Row style={styles.infoContainer}>
              <Col style={{}}>
                <InfoItem title="Roll Number" info="1155434" />
                <InfoItem title="Subject" info="Industrial Design" />
              </Col>

              <Col style={styles.colRight}>
                <InfoItem title="Course" info="B.Design" />
                <InfoItem title="Batch" info="2016-2020" />
              </Col>
            </Row>
            <Row style={[styles.infoContainer,]}>
              <Divider style={{marginVertical:20}}  color="#E8E8EA" />
            </Row>

            <Row style={styles.infoContainer}>
              <Col style={{}}>
                <InfoItem title="Date of Birth" info="15/01/1999" />
                <InfoItem title="Address" info="240/4, DLF Hamilton, Phase 3" />
              </Col>

              <Col style={styles.colRight}>
                <InfoItem title="Email" info="name@collegmail.com" />
                <InfoItem title="Batch" info="Gurgaon" />
              </Col>
            </Row>

            <Row style={styles.infoContainer}>
              <Col style={{}}>
                <InfoItem title="State" info="Haryana" />
              </Col>

              <Col style={styles.colRight}>
                <InfoItem title="Pin" info="221230" />
              </Col>
            </Row>
          </Grid>
        </ScrollView>
      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  headerContent: {
    width: "100%",
    // height: "100%",
    alignItems: "center"
  },

  infoContainer: {
    flex: 0,
    width: "100%",
    alignItems: "center",
  },

  colRight: {
    paddingLeft: 60,
    height: "100%"
  },

  infoRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25
  }
});
export default Profile;
