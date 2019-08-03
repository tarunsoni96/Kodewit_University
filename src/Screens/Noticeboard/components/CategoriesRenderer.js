import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import CategoryItem from "./CategoryItem";
import EStyleSheet from "react-native-extended-stylesheet";
import * as Animatable from 'react-native-animatable';

let isSelected = undefined
let delay = 0
export class CategoriesRenderer extends Component {

  componentWillMount() {
    delay = 0
  }
  
    renderCategories = ({ item, index }) => {
        delay+=200
        isSelected = isSelected === undefined ? true : ''
        
        return (
          <Animatable.View animation='fadeIn' useNativeDriver={true} duration={700} delay={delay} style={{ paddingBottom: 4 }}>
            <CategoryItem isSelected={isSelected} icon={item.icon} name={item.name} />
          </Animatable.View>
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
