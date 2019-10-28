import React, { Component } from "react";
import { Text, Image, View, TouchableWithoutFeedback } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import CustomText from "AppLevelComponents/UI/CustomText";
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors } from "UIProps/Colors";
import 'Helpers/global'
import { ContentConsumer } from "../../../AppLevelComponents/Contexts/CxtBoardContent";
import Icons from "../../../AppLevelComponents/UI/Icons";
import AnimatedTap from "../../../AppLevelComponents/UI/AnimatedTap";

let currentContext;
let isFirstViewSet = false;
class CategoryItem extends Component {
  state = {
    isSelected: false
  };

  setSelectedView(category) {
    isFirstViewSet = true; // to prevent infinite state calls
    currentContext.setContentView(category);
  }

  componentDidMount() {
    const { isSelected, name } = this.props;
    if (isSelected == "Events" && !isFirstViewSet) {
      this.setSelectedView(name);
    }
  }

  componentWillUnmount() {
    isFirstViewSet = false
  }
  
  handlePress() {
    const { categorySelectionHandler, name } = this.props;
    categorySelectionHandler(name);
    
    currentContext.setContentView(name);
  }


  setOnRefresh(cat){
    currentContext.setContentRefresh(cat)
  }

  render() {
    let { name, icon, isSelected, } = this.props;
    isSelected = isSelected == name;

    return (
      <ContentConsumer>
        {context => {
          currentContext = context;

          return (
            <AnimatedTap setOnRefresh={()=>this.setOnRefresh(name)} isSelected={isSelected} onPress={() => this.handlePress()}>
              <Card containerStyle={styles.container}>
                <View style={{ alignItems: "center" }}>
                  <View
                    style={[
                      styles.circle,
                      {
                        backgroundColor: isSelected
                          ? "rgba(39, 164, 255, 0.2)"
                          : "#E1E1E1"
                      }
                    ]}
                  >
                    <Icons
                      lib="AntDesign"
                      name={icon}
                      size={20}
                      color={isSelected ? Colors.accent : "#999999"}
                    />
                  </View>
                  <CustomText
                    font={"AvenirLTStd-Heavy"}
                    text={name}
                    size={12}
                    color={Colors.black}
                  />
                </View>
              </Card>
            </AnimatedTap>
          );
        }}
      </ContentConsumer>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  container: {
    width: "110rem",
    height: "88rem",
    borderRadius: "6rem",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 3,
    shadowOpacity: 0.2
  },

  image: {
    width: "22rem",
    height: "22rem"
  },

  circle: {
    width: 38,
    height: 38,
    borderRadius: 100 / 2,
    backgroundColor: "#f7f7f9",
    marginBottom: "7rem",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default CategoryItem;
