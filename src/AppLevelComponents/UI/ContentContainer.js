import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import * as Animatable from 'react-native-animatable';
import { withNavigation } from "react-navigation";
import { ContentConsumer } from "AppLevelComponents/Contexts/CxtBoardContent";
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors } from "UIProps/Colors";

let animationToPlay = 'flash'
let isPlaying = false
export class ContentContainer extends Component {

  state = {
    animation:''
  }


  animateContainer (play) {
    if(!isPlaying && play){
      this.setState({animation:'flash'})
      isPlaying = true
    } else if(!isPlaying && !play) {
      this.setState({animation:'pulse'})
      isPlaying = true
    }
  }

  resetAnimation(){
    this.setState({animation:''})
    isPlaying = false
  }
  render() {
    return (
      <View style={styles.card}>
        <ContentConsumer>
          {context => {
            context.animateContentContainer ? this.animateContainer(true) : this.animateContainer(false)
            return (
              <Animatable.View animation={this.state.animation} onAnimationEnd={()=>this.resetAnimation()}  useNativeDriver={true} duration={600}  style={{ flex:1,width:'100%'}}>
              <ScrollView
                contentContainerStyle={{
                  // flex: 1,
                  width: "100%",
                  // padding: 14,
                  paddingTop: 0,
                  paddingBottom: 0
                }}
              >
                {this.props.children}
              </ScrollView>
              </Animatable.View>
            );
          }}
        </ContentConsumer>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,
  $borderRadius: 20,

  card: {
    flex: 1,
    backgroundColor: Colors.contentCard,
    marginBottom: "8rem",
    borderBottomLeftRadius: "$borderRadius",
    borderBottomRightRadius: "$borderRadius",
    shadowColor: "#000",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1
  }
});
export default withNavigation(ContentContainer);
