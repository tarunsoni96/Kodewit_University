import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import Container from "AppLevelComponents/UI/Container";
import { Header } from "AppLevelComponents/UI/Header";
import CustomText from 'AppLevelComponents/UI/CustomText'
import SubHeader from "AppLevelComponents/UI/SubHeader";
import PCCustomText from "AppLevelComponents/UI/CustomText";
import AntDesign from 'react-native-vector-icons/AntDesign'
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors } from "UIProps/Colors";
import { Col, Row, Grid } from "react-native-easy-grid";
import { withNavigation } from "react-navigation";
import { NoticeMsgBox } from "../../components/NoticeMsgBox";
import { Card } from "react-native-elements";
import Fonts from "UIProps/Fonts";
class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
        <Card dividerStyle={{height:0}}  titleStyle={{padding:0,marginBottom: 0,}} title='Event Title' containerStyle={styles.card}>
          <View style={styles.descContainer}>

          <CustomText text="Description goes here Some nice description here " singleLine style={{maxWidth:'88%'}} size={15} color='rgba(0,0,0,0.7)' font={Fonts.medium} />
          <AntDesign name='clouddownloado' size={25} color='#000' />
          </View>
        </Card>

        <Card dividerStyle={{height:0}}  titleStyle={{padding:0,marginBottom: 0,}} title='New Title' containerStyle={styles.card}>
          <View style={styles.descContainer}>

          <CustomText text="New Description goes here Some sweet description here " singleLine style={{maxWidth:'88%'}} size={15} color='rgba(0,0,0,0.7)' font={Fonts.medium} />
          <AntDesign name='clouddownloado' size={25} color='#000' />
          </View>
        </Card>

      </View>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  card:{
    width:'100%',
    alignItems:'flex-start'
  },

  descContainer:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    width:'100%'
  }
});

export default withNavigation(Events);
