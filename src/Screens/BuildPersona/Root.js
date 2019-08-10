import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Swiper from "react-native-swiper";
import { Colors } from "UIProps/Colors";
import CustomText from "AppLevelComponents/UI/CustomText";
import Fonts from "UIProps/Fonts";
import "Helpers/global";
import { personaContainer } from "UIProps/Styles";
import HelperMethods from "Helpers/Methods";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import EStyleSheet from "react-native-extended-stylesheet";
import {
  PersonaBuildConsumer,
  CxtPersonaBuild
} from "AppLevelComponents/Contexts/CxtPersonaBuild";
import UserSelection from "./Steps/UserSelection";
import UserDetail from "./Steps/UserDetail";
import NextBtn from "./components/NextBtn";

let currentContext
let steps = 4
let toIncrease = 100 / steps
export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderSwiper: false
    };
  }

  componentWillMount = () => {
    this.renderSwiper();
  };

  renderSwiper() {
    setTimeout(() => {
      this.setState({ renderSwiper: true });
    }, 400);
  }

  swipeTo(btn){
    index = btn == 'next' ?  currentContext.step+1 : currentContext.step-1
    this.swiper.scrollBy(index - currentContext.step, true);
  }

  render() {
    return (
      <CxtPersonaBuild
        navigation={this.props.navigation}
        onBackPress={this.onBackPress}
      >
        <PersonaBuildConsumer>
          {context => {
            currentContext = context
            let currentIndex = context.step;
            return (
              <>
                {this.state.renderSwiper ? (
                  <View style={personaContainer}>
                    <CustomText
                      paddingHorizontal={14}
                      text="Build Profile"
                      color={Colors.accent}
                      size={17}
                      style={{ marginTop: 15 }}
                      font={Fonts.heavy}
                    />

                    <View
                      style={{ flexDirection: "row", alignItems: "center",marginVertical: 15,paddingLeft: 14, }}
                    >
                      <AnimatedCircularProgress
                        size={23}
                        width={2.5}
                        rotation={0}
                        fill={context.progress}
                        tintColor={Colors.accent}
                        onAnimationComplete={() =>
                          console.log("onAnimationComplete")
                        }
                        backgroundColor="#B9D3E9"
                      />

                      <CustomText
                        paddingHorizontal={14}
                        text="Select User type"
                        color={Colors.black}
                        style={{  marginBottom: 0 }}
                        size={17}
                        font={Fonts.heavy}
                      />
                    </View>
                    <Swiper
                    ref={swiper => this.swiper = swiper}
                      showsPagination={false}
                      scrollEnabled={false}
                      index={0}

                      showsButtons={false}
                    >
                      <View style={{flex:1}}>

                      <UserSelection />
                      </View>

                      <View>

                      <UserDetail />
                      </View>
                    </Swiper>
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <ActivityIndicator size="large" />
                  </View>
                )}

<View style={[styles.containerNxtBtn,{position:'absolute',bottom:0}]}>
<NextBtn swipe={(btn)=>this.swipeTo(btn)} />
  </View>

              </>
            );
          }}
        </PersonaBuildConsumer>
        
      </CxtPersonaBuild>
    );
  }
}

const styles = EStyleSheet.create({
  containerNxtBtn:{
    elevation:20,
    width:'100%',
    backgroundColor:'#f6f6ff',
    paddingTop:10,
    
  }
})
