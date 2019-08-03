import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors } from "UIProps/Colors";
export class ContentContainer extends Component {
  render() {
    return (
      <View style={styles.card}>
        <ScrollView contentContainerStyle={{flex:1, width: "100%",padding:10,paddingTop:0,paddingBottom: 0, }}>
          {this.props.children}
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,
  $borderRadius: 20,

  card: {
    flex: 1,
    
    backgroundColor: Colors.contentCard,
    marginBottom: "8rem",
    borderBottomLeftRadius: "$borderRadius",
    borderBottomRightRadius: "$borderRadius",
    shadowColor: "#000",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation:3,
  }
});
export default withNavigation(ContentContainer);
