import {
  Alert,
  AsyncStorage,
  BackHandler,
  Platform,
  Linking,
  LayoutAnimation,
  ToastAndroid
} from "react-native";
import axios from "react-native-axios";
import NavigationService from "ServiceProviders/NavigationService";
import { NavigationActions, StackActions } from "react-navigation";
import moment from "moment";
import "Helpers/global";
import { Colors } from "UIProps/Colors";
import { storeToken, getToken } from 'DataManagers/UserDataManager'


let baseUrl = 'http://192.168.29.212:80/'
let counter = 2;

const HelperMethods = {
  showAlert: function(
    message,
    btnPositive,
    btnNegative,
    onPress_btnNegative,
    onPress_btnPositive,
    buttonNeutral,
    onPressNeutral
  ) {
    Alert.alert(
      "Alert",
      message,
      [
        buttonNeutral != undefined && {
          text: buttonNeutral,
          onPress: () => onPressNeutral()
        },

        {
          text: btnNegative,
          onPress:
            onPress_btnNegative == "" ? () => {} : () => onPress_btnNegative(),
          style: "cancel"
        },
        { text: btnPositive, onPress: () => onPress_btnPositive() }
      ],
      { cancelable: false }
    );
  },

  animateLayout: function() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  },

  isPlatformAndroid: function() {
    return Platform.OS == "android";
  },

  isPlatformIos: function() {
    return Platform.OS == "ios";
  },

  makeNetworkCall: function(apiName, formData,method = 'GET' , callBack,skipToken = false) {
    if(skipToken){
      this.makeApiCall(apiName,'',formData,callBack,method)
    } else {
      getToken().then((val) => {
      const Headers = { 'Authorization': `Bearer ${val}` }
      this.makeApiCall(apiName,Headers,formData,callBack,method)
    })
    }
  },

  makeApiCall:function(apiName,headers,formData,callBack,method){
    axios.interceptors.request.use(request => {
      console.log('Starting Request', request)
      return request
    })
  axios.interceptors.response.use(response => console.log('reponse', response))

    axios({
      url: baseUrl+apiName,
      data:formData,
      headers,
      method,
    })
    .then(response => {
      console.log(response)
      // const {result} = response.data
      // if('auth' in result){ //new token ... update in db
      //   const token = result.auth.token
      //   storeToken(token)
      // }
      callBack(response, false);
    })
    .catch(error => {
      alert(error)
      callBack({},true)
      this.snackbar(`Api error: ${error.response}`,'OK',()=>{})
    });
  },

  logout: function(navigation) {
    AsyncStorage.setItem("loggedIn", "false").then(() => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "login" })]
      });
      navigation.dispatch(resetAction);
    });
  },

  navigateHome: function(
    navigation,
    id,
    fullname,
    email,
    auth_token,
    profile,
    mobile,
    gender,
    noh,
    nob,
    nor,
    penaltyStatus,
    refCode,
    credentialLogin,
    adhaar
  ) {
    UserDataHolder.credentialLogin = credentialLogin;
    UserDataHolder.id = id;
    UserDataHolder.username = fullname;
    UserDataHolder.email = email;
    UserDataHolder.authToken = auth_token;
    UserDataHolder.profile = profile;
    UserDataHolder.contact = mobile;
    UserDataHolder.nob = nob;
    UserDataHolder.noh = noh;
    UserDataHolder.nor = nor;
    UserDataHolder.penaltyStatus = penaltyStatus;
    UserDataHolder.refCode = refCode;
    UserDataHolder.adhaar = adhaar;

    AsyncStorage.setItem("id", id);
    AsyncStorage.setItem("fullname", fullname);
    AsyncStorage.setItem("gender", gender);
    AsyncStorage.setItem("mobile", mobile);
    AsyncStorage.setItem("email", email);
    AsyncStorage.setItem("profile", profile);
    AsyncStorage.setItem("loggedIn", "true");
    AsyncStorage.setItem("noh", noh);
    AsyncStorage.setItem("nor", nor);
    AsyncStorage.setItem("nob", nob);
    AsyncStorage.setItem("refCode", refCode);
    AsyncStorage.setItem("penaltyStatus", penaltyStatus);
    AsyncStorage.setItem("credentialLogin", credentialLogin);
    AsyncStorage.setItem("adhaar", adhaar);
    AsyncStorage.setItem(constants.constant_appLaunched, "true");
    AsyncStorage.setItem("authToken", auth_token).then(() => {
      if (UserDataHolder.username == "") {
        alert("Please set user data in UserDataHolder model to navigate home");
        return;
      } else {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: "home",
              params: { loginData: UserDataHolder }
            })
          ]
        });
        navigation.dispatch(resetAction);
      }
    });
  },

  snackbar: function(message, actionFuncTitle, actionFunc, length) {
    let snackLen =
      length == "short" ? Snackbar.LENGTH_SHORT : Snackbar.LENGTH_LONG;
    Snackbar.show({
      title: message,
      duration: snackLen,
      action: {
        title: actionFuncTitle,
        color: Colors.accent,
        onPress: () => {
          actionFunc();
        }
      }
    });
  },

  capitailizeFirst: (String.prototype = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }),

  openGMaps: function(lat, lng, label) {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q="
    });
    const latLng = `${lat},${lng}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  },

  formatAMPM: function(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  },

  makeCall: function(mob) {
    Linking.openURL(`tel:${mob}`);
  },

  openAppinPS: function(packageName) {
    Linking.openURL("market://details?id=" + packageName + "&hl=en");
  },

  appExitPrompter: function() {
    if (counter == 2) {
      setTimeout(() => {
        counter = 2;
      }, 2000);
      ToastAndroid.show("Press again to Quit", 1000);
    }
    counter -= 1;
    if (counter == 0) BackHandler.exitApp();
  },

  switchToLangSelector: function() {
    NavigationService.navigate("langSelectorStack", {
      isForLanguageChange: true
    });
  },

  formatDate_DMY: function(date) {
    return moment(date).format("DD-MM-YYYY");
  }
};

export default HelperMethods;
