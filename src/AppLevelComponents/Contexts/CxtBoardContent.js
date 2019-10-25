import React, { Component } from "react";
import { LayoutAnimation, UIManager, Platform,View } from "react-native";
import HelperMethods from 'Helpers/Methods'
import Constants from "Helpers/Constants";
import Events from "Screens/Noticeboard/CategoryContents/Events/Events";
import TimeTable from "Screens/Noticeboard/CategoryContents/TimeTable/TimeTable";
import Syllabus from "Screens/Noticeboard/CategoryContents/Syllabus/Syllabus";
import { Categories } from "Screens/Noticeboard/Categories/Student";
import Fees from "Screens/Noticeboard/CategoryContents/Fees/Fees";
import Circular from "../../Screens/Noticeboard/CategoryContents/Circular/Circular";
import Leaves from "../../Screens/Noticeboard/CategoryContents/Leaves/Leaves";
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
        
        this.setState({ contentView: <Events /> });
        break;

        case Constants.categoryCircular:
            this.setState({ contentView: <Circular /> });
          break;

        case Constants.categoryCurriculum:
          this.setState({ contentView: <Syllabus /> });
        break;

      case Constants.categoryTimeTable:
          this.setState({ contentView: <TimeTable /> });
        break;

      case Constants.categoryResults:
        break;

      case Constants.categoryFees:
          this.setState({ contentView: <Fees /> });
        break;

        case Constants.categoryLeaves:
          this.setState({ contentView: <Leaves /> });
        break;

    }

    currentCategory = category
  };

  pauseContentContainerAnimation = (animationState) => {
    this.setState({animateContentContainer:animationState})
  }
  render() {
    return (
      <BoardContext.Provider
        value={{
          contentView: this.state.contentView,
          categoriesData: this.state.categoriesData,
          animateContentContainer:this.state.animateContentContainer,
          pauseContentContainerAnimation:this.pauseContentContainerAnimation,
          setContentView: this.setContentView
        }}
      >
        {this.props.children}
      </BoardContext.Provider>
    );
  }
}
