import React, { Component } from "react";
import { LayoutAnimation, UIManager, Platform,View } from "react-native";
import HelperMethods from 'Helpers/Methods'
import Constants from "Helpers/Constants";
import Events from "Screens/Noticeboard/CategoryContents/Student/Events/Events";
import { Categories } from "Screens/Noticeboard/Categories/Student";
export const BoardContext = React.createContext();
export const ContentConsumer = BoardContext.Consumer;

export class BoardContentProvider extends Component {
  state = {
    contentView: null,
    categoriesData: null
  };

  componentWillMount() {
    //set dummy user type for now.> demo!!
    this.setState({ categoriesData: Categories });
  }

  setContentView = category => {

    switch (category) {
      case Constants.categoryEvents:
        HelperMethods.animateLayout()
        this.setState({ contentView: <Events /> });
        break;

      case Constants.categorySyllabus:
        break;

      case Constants.categoryTimeTable:
        break;

      case Constants.categoryResults:
        break;

      case Constants.categoryFee:
        break;
    }
  };
  render() {
    return (
      <BoardContext.Provider
        value={{
          contentView: this.state.contentView,
          categoriesData: this.state.categoriesData,
          setContentView: this.setContentView
        }}
      >
        {this.props.children}
      </BoardContext.Provider>
    );
  }
}
