import 'Helpers/global'
import EStyleSheet from "react-native-extended-stylesheet";
import {Colors} from "UIProps/Colors";
import Fonts from "UIProps/Fonts";
EStyleSheet.build({
  $rem: global.rem
});

export const inputStyles = EStyleSheet.create({
  fontSize:17*global.rem,
  
  color: Colors.black,
  paddingHorizontal:10,
  backgroundColor:'#fff'
});

export let labelStyle = EStyleSheet.create({
  paddingHorizontal: 1*global.rem,
  alignSelf:'flex-start',
  color: "#000",
  fontFamily:Fonts.medium,
  fontSize:17*global.rem,
  marginBottom: 10,
});

export let labelStyleSignup = EStyleSheet.create({
  paddingHorizontal: 1*global.rem,
  alignSelf:'flex-start',
  color: Colors.light,
  fontSize:18*global.rem,
  fontFamily:Fonts.regular 
});

export const inputStylesContainer = EStyleSheet.create({
  
  // padding: global.rem * 5,

  color: "#fff",
  alignSelf:'flex-start',
  
  marginTop:  20
});

export const inputErrors = {
  color: "red",
  fontSize: 24*global.rem,
  alignSelf: 'flex-start',
  textAlign:'left'
};

export const inputContainerStyle = {
  borderRadius: 3,
  borderWidth:1,
  borderColor: Colors.inputBorderColor,
  width:'100%',
  marginVertical:3
  
};

export const appHeaderBlack = {
  backgroundColor:'#000',
  tintColor:'#fff',
}

export const stepIndicator = {
  marginVertical: 20*global.rem,
}

export const stepsStyle={

  stepIndicatorSize: 23,
  currentStepIndicatorSize:27,
  separatorStrokeWidth: 2.6,
  currentStepStrokeWidth: 1.3,
  stepStrokeCurrentColor: Colors.accent,
  stepStrokeWidth: 1.3,
  stepStrokeFinishedColor: Colors.accent,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: Colors.accent,
  separatorUnFinishedColor: '#707070',
  stepIndicatorFinishedColor: Colors.accent,
  stepIndicatorUnFinishedColor: Colors.black,
  stepIndicatorCurrentColor: Colors.black,
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: Colors.accent,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: Colors.white,
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'

}

export const register_ViewPager = {
  flex:1,
  height:'100%'
}

export const registerSubTitle = {
  marginTop:25,
  
}

export const containerStyle = {
  flex: 1,
  padding:15*global.rem,
    backgroundColor: "#000"
  
}

export const containerContentStyle = {
 
alignItems: "center",flexGrow:1, paddingBottom:10,

  
}

