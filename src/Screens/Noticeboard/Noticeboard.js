import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import Container from "AppLevelComponents/UI/Container";
import { Header } from "AppLevelComponents/UI/Header";
import SubHeader from "AppLevelComponents/UI/SubHeader";
import EStyleSheet from "react-native-extended-stylesheet";
import ContentContainerAnimated from "AppLevelComponents/UI/ContentContainerAnimated";
import {
  BoardContentProvider,
  ContentConsumer
} from "AppLevelComponents/Contexts/CxtBoardContent";
import CategoriesRenderer from "./components/CategoriesRenderer";
import { withNavigation } from "react-navigation";

export default class Noticeboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BoardContentProvider>
        <ContentConsumer>
          {context => {
            return (
              <Container style={{flex:1}} scroll={false} padding={0}>
                <Header>
                  <SubHeader unreadNotifications={true} />
                  <CategoriesRenderer data={context.categoriesData} />
                </Header>
                <View style={{ width: "100%", flex: 1 }}>
                  <ContentContainerAnimated>{context.contentView}</ContentContainerAnimated>
                </View>
              </Container>
            );
          }}
        </ContentConsumer>
      </BoardContentProvider>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  categoryScroller: {
    marginTop: "22rem",
    paddingBottom: 10
  },

  grid: {
    width: "100%"
  },
  gridCol: {
    marginHorizontal: "8rem",
    justifyContent: "space-between"
  },

  row: {
    flex: 0
  },

  msgTitle: {
    marginTop: "15rem",

    fontSize: 15
  }
});

