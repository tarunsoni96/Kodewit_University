import React, { Component } from "react";
import { SafeAreaView, ScrollView, StatusBar} from "react-native";
import "Helpers/global";
import HelperMethods from "Helpers/Methods";
import EStyleSheet from "react-native-extended-stylesheet";
import {Colors} from "UIProps/Colors";
import BackHandlerSingleton from "ServiceProviders/BackHandlerSingleton";
import { withNavigation } from "react-navigation";
 class Container extends Component {

  renderForIOS() {
    let {padding,style,contentPadding,scroll} = this.props
    return (
      <>
      <SafeAreaView style={{ flex: 0, backgroundColor: Colors.accent }} />
      <SafeAreaView style={{ flex: 1,backgroundColor:Colors.accent }}>
      <StatusBar barStyle="light-content" />
        <ScrollView
        scrollEnabled={scroll}
          style={styles.container}
          contentContainerStyle={{alignItems: "center",...style,padding:padding == 0 ? 0 : 15*global.rem, }}
          keyboardShouldPersistTaps="always"
        >
          {this.props.children}
        </ScrollView>
      </SafeAreaView>
      </>
    );
  }

  renderForAndroid() {
    let {padding,style,contentPadding,scroll} = this.props
    scroll = scroll ? scroll : true
    return (
      <>
      <StatusBar backgroundColor={Colors.accent} barStyle="light-content" />
      <ScrollView
      scrollEnabled={scroll}
      style={[styles.container,{padding:padding*global.rem || 0*global.rem,...style,backgroundColor:'#fff', }]}
      contentContainerStyle={{flex:1,alignItems: "center",...style,padding:padding == 0 ? 0 : 15*global.rem, }}
      keyboardShouldPersistTaps="always"
      >
        {this.props.children}
      </ScrollView>
      </>
    );
  }

  render() {
    
    return (
      <>
      {<BackHandlerSingleton navigation={this.props.navigation} onBackPress={this.props.onBackPress} />}
        {HelperMethods.isPlatformAndroid()
          ? this.renderForAndroid()
          : this.renderForIOS()}
      </>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  container: {
    flex: 1,
    
    backgroundColor: Colors.pageBackground
  },

  contentContainerStyle:{
    alignItems: "center",flexGrow:1, paddingBottom:'10rem',
    
    
  }
});

export default withNavigation(Container)