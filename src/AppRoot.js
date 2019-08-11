import React, { Component, Fragment } from "react";

import { View, StatusBar, Text } from "react-native";
import { Colors } from "UIProps/Colors";
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import "Helpers/global";
import EStyleSheet from "react-native-extended-stylesheet";
import Noticeboard from "Screens/Noticeboard/Noticeboard";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { Transition } from "react-native-reanimated";
import {
  zoomIn,
  fromBottom,
  fromLeft,
  fromRight
} from "react-navigation-transitions";
import { appHeaderBlack } from "UIProps/Styles";
import Profile from "./Screens/Profile/Profile";
import MyCourse from "./Screens/MyCourse/MyCourse";
import Chat from "./Screens/Chat/Chat";
import Login from "Screens/Login/Login";
import BuddyChat from "./Screens/BuddyChat/BuddyChat";
import Root from "Screens/BuildPersona/Root";
import NotificationsHistory from "./Screens/NotificationsHistory/NotificationsHistory";

let transitionSpeed = 700;
let tabIconSize = 18
const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions here..
  if (
    prevScene &&
    prevScene.route.routeName === "login" &&
    nextScene.route.routeName === "screen_signup"
  ) {
    return zoomIn(transitionSpeed);
  } else if (
    prevScene &&
    prevScene.route.routeName === "login" &&
    nextScene.route.routeName === "screen_languageSelection"
  ) {
    return fromBottom(transitionSpeed);
  }
  return fromRight(transitionSpeed);
};


const BuildPersona = createStackNavigator({
  root: {
    screen: Root,
    navigationOptions: {
      header: null
    }
  }
});



const LoginStack = createStackNavigator({
  login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  }
});

const NoticeboardStack = createStackNavigator({
  Noticeboard: {
    screen: Noticeboard,
    navigationOptions: {
      header: null
    }
  },


  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null,
    }
  },

  NotificationsHistory: {
    screen: NotificationsHistory,
    navigationOptions: {
      header: null,
    }
  },

},{
  // initialRouteName:'NotificationsHistory'
});

const AppStudent = createMaterialBottomTabNavigator(
  {
    Noticeboard: {
      screen: NoticeboardStack,
      navigationOptions: {
        header: null,
        tabBarLabel: "Board",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="view-dashboard"
            color={tintColor}
            size={tabIconSize}
          />
        )
      }
    },

    chat: {
      screen: Chat,
      navigationOptions: {
        header: null,
        tabBarLabel: "Chat",
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="message1" color={tintColor} size={20} />
        )
      }
    },

    myCourse: {
      screen: MyCourse,
      navigationOptions: {
        header: null,
        tabBarLabel: "My Course",
        tabBarIcon: ({ tintColor }) => (
          <Entypo
            name="open-book"
            color={tintColor}
            size={tabIconSize}
          />
        )
      }
    },

    buddyChat: {
      screen: BuddyChat,
      navigationOptions: {
        header: null,
        tabBarLabel: "Buddy",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="robot"
            color={tintColor}
            size={tabIconSize}
          />
        )
      }
    },

   
  },
  {
    initialRouteName: "Noticeboard",
    // order:['Noticeboard','Profile'],
    activeTintColor: Colors.accent,
    inactiveColor: "#a8a8a8",
    shifting: false,
    barStyle: { elevation: 0 },
    transitionConfig: nav => handleCustomTransition(nav),
  }
);

const TopLevelNavigator = createAnimatedSwitchNavigator(
  {
    AppStudent,
    LoginStack,
    BuildPersona,
    // AppTeacher,
    // AppParent,
  },
  {
    // The previous screen will slide to the bottom while the next screen will fade in
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-top"
          durationMs={500}
          interpolation="easeIn"
        />
        <Transition.In type="slide-top" durationMs={transitionSpeed} />
      </Transition.Together>
    )
  }
);
const AppContainer = createAppContainer(TopLevelNavigator);

export default class AppRoot extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <AppContainer />
        </View>
      </>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  container: {
    flex: 1
  }
});
