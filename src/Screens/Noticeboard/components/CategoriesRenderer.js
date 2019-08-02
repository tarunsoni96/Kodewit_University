import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import CategoryItem from "./CategoryItem";
import EStyleSheet from "react-native-extended-stylesheet";

let isSelected = undefined
export class CategoriesRenderer extends Component {

    renderCategories = ({ item, index }) => {
        
        isSelected = isSelected === undefined ? true : ''
        
        return (
          <View style={{ paddingBottom: 4 }}>
            <CategoryItem isSelected={isSelected} name={item} />
          </View>
        );
      };


  render() {
    let { data } = this.props;
    return (
      <View style={styles.categoryScroller}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={data}
          
          keyExtractor={(item, index) => index + ""}
          horizontal
          renderItem={this.renderCategories}
        />
      </View>
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

});

export default CategoriesRenderer;
