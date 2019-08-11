import React, { Component } from "react";
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import {checkForEmptyKeys} from 'ServiceProviders/InputsNullChecker'

import { Text, View } from "react-native";
import { withNavigation } from "react-navigation";
import BackHandlerSingleton from 'ServiceProviders/BackHandlerSingleton'
import InputsErrorOverlay from "../UI/InputsErrorOverlay";

export const PersonaBuildContext = React.createContext();
export const PersonaBuildConsumer = PersonaBuildContext.Consumer;

let teacherSteps = 3
let studentSteps = 3
let parentSteps = 3
let progressToIncrease = undefined
let userDetailObj = {}
export class CxtPersonaBuild extends Component {

  state = {
    step : 0,
    progress:0,
    errorString:'',
    userType:'Teacher',
    userDetailObj:{},
    totalSteps:3 // steps -> for teacher - 3 ,
  }

  updateSwiperIndex = (index) => {
      this.setState({step:index})
  }

  setupProgressMeter = () => {
    switch(this.state.userType){
      case 'Teacher':
        progressToIncrease = 100 /teacherSteps
        break

        case 'Student':
            progressToIncrease = 100 /studentSteps
          break

          case 'Parent':
            progressToIncrease = 100 /parentSteps
          break
    }
  }

  getSavedData(){
    return new Promise(function(resolve,reject) {
      const {userType,step} = this.state
      AsyncStorageHandler.get(userType+step,(data)=>{
        if(data != null){
          resolve(data)
        } else {
          reject('No data')
        }
      })
    })
  }

  restoreStep = (dataRequestingStep) => {
    this.getSavedData().then(data => {
      dataRequestingStep(data)
    })
  }

  handleNxtBtn = (step) => {
    let {anyEmptyInputs,} = checkForEmptyKeys(userDetailObj)
    let errorString = ''
    
    if(anyEmptyInputs.length > 0){
      errorString += `Error occured, Please fill `
      for(let i=0, len = anyEmptyInputs.length; i < len;i++){
        errorString += anyEmptyInputs[i]+','
      } 
      this.setState({errorString,});
    } else {
      switch(step){
        case 1: //user details
        this.saveStepData(userDetailObj)
        break
        
        case 2: //profile pic
        break
      }
      this.moveForward()
    }
  }

  handleBackBtn = (index) => {
    this.moveBack()

  }

  moveForward(){
    this.increaseProgress()
    this.updateSwiperIndex(this.state.step+1)
  }

  increaseProgress(){
    
    this.setState({progress : this.state.progress+= progressToIncrease})
  }

  decreaseProgress(){
    
    this.setState({progress : this.state.progress-=progressToIncrease})
  }

  moveBack(){
    this.decreaseProgress()
    this.updateSwiperIndex(this.state.step-1)
  }


  saveStepData(stepData){
    const {userType,step} = this.state
    AsyncStorageHandler.store(userType+step,stepData)
  }

  setUserType = (user) => {
    this.setState({userType:user},()=>{
      this.setupProgressMeter()
    })
  }

  setUserDetailObj = (obj) => {
    userDetailObj = obj
    
    
  }

  render() {
    return (
      <PersonaBuildContext.Provider value={{
          step:this.state.step,
          updateIndex:this.updateSwiperIndex,
          setupProgressMeter:this.setupProgressMeter,
          handleNxtBtn:this.handleNxtBtn,
          progress:this.state.progress,
          handleBackBtn:this.handleBackBtn,
          restoreStep:this.restoreStep,
          setUserType:this.setUserType,
          setUserDetailObj:this.setUserDetailObj,
      }}>
        {this.props.children}
        <InputsErrorOverlay text={this.state.errorString} />
        <BackHandlerSingleton
          navigation={this.props.navigation}
          onBackPress={this.props.onBackPress}
        />
      </PersonaBuildContext.Provider>
    );
  }
}

export default withNavigation(CxtPersonaBuild);
