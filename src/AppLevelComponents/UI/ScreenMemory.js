import React, { Component } from "react";
import Constants from "Helpers/Constants";
import "Helpers/global";
import HelperMethods from "Helpers/Methods";
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import NavigationService from "ServiceProviders/NavigationService";

export default class ScreenMemory extends Component {
  state = {
    renderContent: false
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.judgeScreenMemory();
  }

  judgeScreenMemory() {
    let { screen, screenParams } = this.props; //optional screenParams for influenced custom  behaviour

    switch (
      screen //need to always provide screen prop to this class or else nothing would render.
    ) {
      case Constants.screenSource_langSelector:
        this.isLangSelected(screenParams);
        break;

      case Constants.screenSource_login:
        this.checkIsLoggedIn(screenParams);
        break;
    }
  }

  isLangSelected(screenParams) {
    let { isForLanguageChange } = screenParams ? screenParams : {};

    if (isForLanguageChange) {
      this.setState({ renderContent: true });
      // return
    } else {
      AsyncStorageHandler.get(Constants.LANGUAGE_SELECTED, val => {
        if (val == null) {
          this.drawContent();
        } else {
            NavigationService.navigate("loginStack", {});
        }
      });
    }
  }

  haveAccount(callback) {
    AsyncStorageHandler.get(Constants.HAS_ACCOUNT, val => {
        callback(val)
    });
  }

  checkIsLoggedIn(screenParams) {
    //checks if logged in or not
     this.haveAccount(have => {
         
         if(have == null){
             NavigationService.navigate("screen_signup", {});
             setTimeout(()=>{

                 this.drawContent();
                },1000)
         } else {
            AsyncStorageHandler.get(Constants.IS_REMEMBERED, val => {
                if (val == null) {
                  this.drawContent();
                } else {
                  // this.drawContent();
                  NavigationService.navigate("dashboard", {});
                }
              });
            
         }
     })
    
    
  }

  drawContent() {
    this.setState({ renderContent: true });
  }

  renderChildren() {
    let { children } = this.props;
    return children;
  }

  render() {
    return <>{this.state.renderContent && this.renderChildren()}</>;
  }
}
