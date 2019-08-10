import React, { Component } from "react";
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import { Text, View } from "react-native";
import { withNavigation } from "react-navigation";
import BackHandlerSingleton from 'ServiceProviders/BackHandlerSingleton'
export const PersonaBuildContext = React.createContext();
export const PersonaBuildConsumer = PersonaBuildContext.Consumer;

let teacherSteps = 3
let studentSteps = 2
let progressToIncrease = undefined
export class CxtPersonaBuild extends Component {

  state = {
    step : 0,
    progress:0,
    userType:'Teacher',
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

  handleNxtBtn = (step,stepData) => {
    if(step == 0){
    
    }
    this.saveStepData(stepData)
    this.moveForward()
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
          setUserType:this.setUserType
      }}>
        {this.props.children}
        {/* <InputsErrorOverlay text={this.state.errorString} /> */}
        <BackHandlerSingleton
          navigation={this.props.navigation}
          onBackPress={this.props.onBackPress}
        />
      </PersonaBuildContext.Provider>
    );
  }
}

export default withNavigation(CxtPersonaBuild);
