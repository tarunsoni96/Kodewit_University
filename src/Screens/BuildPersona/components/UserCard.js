import React ,{ Component}from "react";
import { View, Text, ImageBackground,Image,Animated } from "react-native";
import { Card } from "react-native-elements";
import CustomText from "AppLevelComponents/UI/CustomText";
import Icons from "AppLevelComponents/UI/Icons";
import * as Animatable from 'react-native-animatable';

import { Colors } from "UIProps/Colors";
import Fonts from "UIProps/Fonts";
import EStyleSheet from "react-native-extended-stylesheet";
import "Helpers/global";

let colorUnselected = "#a2a2a2";
let colorSelected = Colors.accent;

var color
export default class UserCard extends Component {

  state = {
    colorValue : new Animated.Value(0)
     
  };

  componentWillReceiveProps(nextProps){
    const {selected} = nextProps
    if(selected){
      this.state.colorValue.setValue(0)
      this.animateColor()
    }
  }

  animateColor(){
    Animated.timing(this.state.colorValue,{
      toValue:300,
      duration:600,
    }).start()
   
  }
  render(){
    color = this.state.colorValue.interpolate({
      inputRange: [0, 300],
      outputRange: ['rgba(39,164,255,0)', 'rgba(39,164,255,1)']
  });

  circleColor = this.state.colorValue.interpolate({
    inputRange: [0, 300],
    outputRange: ['rgba(162,162,162,1)', 'rgba(39,164,255,1)']
  });

    const { img,imgUnselected, user, selected } = this.props
  return (
    <View
      style={{
        flex: 1,
        marginTop: 0,
        width: "100%",
        alignItems: "center",
        paddingBottom: 20,
      }}
    >
      <Animated.View style={[styles.container,{borderColor:selected ? color : 'rgba(0,0,0,0)' ,borderWidth: 2 }]}>
        <ImageBackground
          style={{ width: 120, height: 120,  }}
          resizeMethod="resize"
          resizeMode="contain"
          source={imgUnselected}>
          {selected && 
              <Animatable.View animation='fadeIn' useNativeDriver={true} duration={600}  style={{ flex:1,width:'100%'}}>
         <Image
         style={{ width: 120, height: 120,  }}
         resizeMethod="resize"
         resizeMode="contain"
         source={img}
         />
         </Animatable.View>
        }
        </ImageBackground>
        <CustomText
          text={user}
          textAlign="center"
          style={{ marginTop: 10 }}
          color={selected ? colorSelected : colorUnselected}
          size={16}
          font={Fonts.heavy}
        />

        <Animated.View
          style={[
            styles.circle,
            { backgroundColor: selected ? circleColor : colorUnselected }
          ]}
        >
          <Icons lib="Ionicons" name="md-checkmark" size={22} color="#fff" />
        </Animated.View>
      </Animated.View>
    </View>
  );
};
}
const styles = EStyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 3,
    elevation: 5,
    paddingTop: 5,
    alignItems: "center",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 170.5,
    height: 203.1,
    shadowColor: "#000",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 2
  },

  circle: {
    width: 38,
    height: 38,
    position: "absolute",
    bottom: "-18rem",
    zIndex: 100,
    borderRadius: 100 / 2,
    backgroundColor: "#a2a2a2",
    alignItems: "center",
    justifyContent: "center"
  }
});

