import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { Colors } from "UIProps/Colors";
import firebase from "react-native-firebase";
import Constants from 'Helpers/Constants'
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import {registerDevice} from 'ServiceProviders/ApiCaller'
export default class PushNotification extends Component {
  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      alert(notificationOpen)
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification = notificationOpen.notification;
  });


  }

  componentWillUnmount() {
    this.notificationListener;
    this.notificationOpenedListener;
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async createNotificationListeners() {
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body } = notification;
        const localNotificationSound = new firebase.notifications.Notification({
          sound: "default",
          show_in_foreground: true
        })

          // .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setBody(notification.body)
          .android.setChannelId("fcm_default_channel") // e.g. the id you chose above
          .android.setSmallIcon('ic_notification') // create this icon in Android Studio
          .android.setColor(Colors.accent)
          .android.setPriority(firebase.notifications.Android.Priority.High);

        firebase.notifications().displayNotification(localNotificationSound);
      });

    const channel = new firebase.notifications.Android.Channel(
      "fcm_default_channel",
      "University",
      firebase.notifications.Android.Importance.High
    ).setDescription("None");
    firebase.notifications().android.createChannel(channel);

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        alert('d')
        const { title, body,navigation } = notificationOpen.notification;
        alert(navigation)
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body,navigation } = notificationOpen.notification;
        alert(navigation)
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    }
    
    console.log(fcmToken);
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {}
  }

  render() {
    return null;
  }
}
