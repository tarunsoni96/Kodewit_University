import React, { Component, Fragment } from "react";

import { View, StatusBar, Animated,Easing } from "react-native";
import { Colors } from "UIProps/Colors";
import {
  createStackNavigator,
  createAppContainer,
} from "react-navigation";
import Icons from 'AppLevelComponents/UI/Icons'

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import "Helpers/global";
import {
  createFluidNavigator,
  Transition as fluidTransition,
  FluidNavigator
} from "react-navigation-fluid-transitions";

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
import NotificationsHistory from "Screens/NotificationsHistory/NotificationsHistory";
import ChildPhotographs from "Screens/ChildPhotographs/ChildPhotographs";
import HolidayCalendar from "Screens/HolidayCalendar/HolidayCalendar";
import iCard from "Screens/iCard/iCard";
import PhotoGraphFullView from "Screens/PhotographFullView/PhotoGraphFullView";
import Settings from "Screens/Settings/Settings";
import ForgotPassword from "./Screens/ForgotPassword/ForgotPassword";
import ResetPassword from "./Screens/ResetPassword/ResetPassword";

let transitionSpeed = 650;
let tabIconSize = 18;

const transitionConfig = {
  duration: 500,
};


const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions here..
  if (
    prevScene &&
    prevScene.route.routeName === "Noticeboard" &&
    nextScene.route.routeName === "iCard"
  ) {
    return zoomIn(transitionSpeed);
  } else if (
    prevScene &&
    prevScene.route.routeName === "Noticeboard" &&
    nextScene.route.routeName === "Profile"
  ) {
    return null;
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
  },

  forgotPassword: {
    screen: ForgotPassword,
  },

  resetPassword: {
    screen: ResetPassword,
  }

},{
  initialRouteName:'login',
  headerMode:'none'
});



const sharedPhotos = FluidNavigator({
  photos: {
    screen: ChildPhotographs,
    navigationOptions: {
      header: null
    }
  },
  photographs_FullView: {
    screen: PhotoGraphFullView,
    navigationOptions: {
      header: null
    }
  },
},{
  transitionConfig
})



const sharedPic = FluidNavigator({
  Noticeboard: {
    screen: Noticeboard,
    navigationOptions: {
      header: null
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null
    }
  },
},{
  transitionConfig
})


const NoticeboardStack = createStackNavigator(
  {
   
   
Noticeboard:sharedPic,
    
   Photos:sharedPhotos,

    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null
      }
    },

    NotificationsHistory: {
      screen: NotificationsHistory,
      navigationOptions: {
        header: null
      }
    },

  

    HolidayCalendar: {
      screen: HolidayCalendar,
      navigationOptions: {
        header: null
      }
    },

    iCard: {
      screen: iCard,
      navigationOptions: {
        header: null
      }
    },

    Settings: {
      screen: Settings,
      navigationOptions: {
        header: null
      }
    }




  },
  {
    // initialRouteName: "Profile",
    transitionConfig: nav => handleCustomTransition(nav),
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
  }
);

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
          <AntDesign name="wechat" color={tintColor} size={20} />
        )
      }
    },

    myCourse: {
      screen: MyCourse,
      navigationOptions: {
        header: null,
        tabBarLabel: "My Course",
        tabBarIcon: ({ tintColor }) => (
          
          <Icons lib='FontAwesome5' name="book-reader" color={tintColor} size={tabIconSize} />
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
    }
  },
  {
    initialRouteName: "Noticeboard",
    // order:['Noticeboard','Profile'],
    activeTintColor: Colors.accent,
    inactiveColor: "#a8a8a8",
    shifting: false,
    barStyle: { elevation: 0 },
    transitionConfig: nav => handleCustomTransition(nav)
  }
);

const TopLevelNavigator = createAnimatedSwitchNavigator(
  {
    LoginStack,
    AppStudent,
    BuildPersona
  },
  {
    //The previous screen will slide to the bottom while the next screen will fade in
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
