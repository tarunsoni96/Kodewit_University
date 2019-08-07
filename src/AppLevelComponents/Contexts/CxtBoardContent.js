import React, { Component } from "react";
import { LayoutAnimation, UIManager, Platform,View } from "react-native";
import HelperMethods from 'Helpers/Methods'
import Constants from "Helpers/Constants";
import Events from "Screens/Noticeboard/CategoryContents/Events/Events";
import TimeTable from "Screens/Noticeboard/CategoryContents/TimeTable/TimeTable";
import Syllabus from "Screens/Noticeboard/CategoryContents/Syllabus/Syllabus";
import { Categories } from "Screens/Noticeboard/Categories/Student";
export const BoardContext = React.createContext();
export const ContentConsumer = BoardContext.Consumer;

let currentCategory
export class BoardContentProvider extends Component {
  state = {
    contentView: null,
    categoriesData: null,
    animateContentContainer:false,
  };

  componentWillMount() {
    //set dummy user type for now.> demo!!
    this.setState({ categoriesData: Categories });
  }

  setContentView = category => {
    if(currentCategory == category){
      this.setState({animateContentContainer:true})
    } else {
      this.setState({animateContentContainer:false})
    }
    HelperMethods.animateLayout()
    switch (category) {
      case Constants.categoryEvents:
        
        this.setState({ contentView: <TimeTable /> });
        break;

      case Constants.categorySyllabus:
          this.setState({ contentView: <Syllabus /> });
        break;

      case Constants.categoryTimeTable:
        break;

      case Constants.categoryResults:
        break;

      case Constants.categoryFee:
        break;
    }

    currentCategory = category
  };
  render() {
    return (
      <BoardContext.Provider
        value={{
          contentView: this.state.contentView,
          categoriesData: this.state.categoriesData,
          animateContentContainer:this.state.animateContentContainer,
          setContentView: this.setContentView
        }}
      >
        {this.props.children}
      </BoardContext.Provider>
    );
  }
}
