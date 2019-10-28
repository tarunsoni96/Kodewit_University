import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Animated
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { thisExpression } from "@babel/types";

let negativeScale = 0.9;
let defaultScale = 1;
let animDuration = 100;
export default class AnimatedTap extends Component {
  state = {
    animatePress: new Animated.Value(1)
  };

  scaleInHold() {
    const {setOnRefresh} = this.props
    Animated.spring(this.state.animatePress, {
      toValue: negativeScale - 0.1,
      duration: animDuration,
      useNativeDriver: true
    }).start(() => {
      setOnRefresh()
      this.cutInAnimation();
      setTimeout(() => {
        this.animateOut();
      }, 50);
    });
  }

  animateIn(isBtnToggled) {
    this.cutInAnimation();
    return
    Animated.timing(this.state.animatePress, {
      toValue: isBtnToggled ?  negativeScale + 0.3 : negativeScale,
      duration: animDuration,
      useNativeDriver: true
    }).start(() => {});
    
  }

  cutInAnimation() {
    const { onPress } = this.props;
    onPress();
    
  }
  animateOut() {
    // this.props.pressHandler()
      
    Animated.timing(this.state.animatePress, {
      toValue: defaultScale,
      friction: 2,
      tension: 0,
      useNativeDriver: true,
      duration: animDuration
    }).start(() => {});
  }

  render() {
      const {isSelected} = this.props
    return (
      <TouchableWithoutFeedback
        onLongPress={() => this.scaleInHold()}
        onPress={() => this.animateIn(isSelected)}
      >
        <Animated.View
          style={{
            transform: [
              {
                scale: this.state.animatePress
              }
            ]
          }}
        >
          {this.props.children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
};
