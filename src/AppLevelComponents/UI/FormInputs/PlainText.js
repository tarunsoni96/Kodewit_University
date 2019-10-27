import React, { Component } from "react";
import { Text, View } from "react-native";
import { Input } from "react-native-elements";
import { Colors } from "UIProps/Colors";
import {
  inputStylesContainer,
  labelStyle,
  inputsError,
  inputContainerStyle
} from "UIProps/Styles";
import "Helpers/global";
import HelperMethods from "Helpers/Methods";


export default class PlainText extends Component {
  state = {
    error: "",
wantToEdit:undefined,
    text: ""
  };

  setText(text) {
    this.setState({ text,wantToEdit:true });
    this.props.inputValueGetter(text);
    
  }

  render() {
    let {width,containerStyleAdd,multiline,inputStylesAdd,value,label,placeholder} = this.props    
    return (
      <Input
      inputStyle={{textAlignVertical: "top",height:200,margin:17}}
        label={label || "Email Address"}
        labelStyle={labelStyle}
        multiline={multiline}
        inputContainerStyle={{...inputContainerStyle,...containerStyleAdd,}}
        onChangeText={text => this.setText(text)}
        value={this.state.wantToEdit ? this.state.text : value}
        placeholderTextColor={Colors.inputs_placeholders}
        errorStyle={inputsError}
        errorMessage={this.state.error}
      />
    );
  }
}