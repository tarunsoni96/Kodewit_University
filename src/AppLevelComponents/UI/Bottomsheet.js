import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  CoordinatorLayout,
  BottomSheetBehavior
} from "react-native-bottom-sheet-behavior";
import Modal from "react-native-modal";

let that;
let borderRadius = 20;
class Bottomsheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false
    };
  }

  componentWillMount() {
    that = this;
  }

  static openBottomsheet() {
    that.setState({visible:true})
  }

  static closeBottomsheet() {
    that.setState({visible:false})
  }

  hideModal(){
    this.setState({visible:false})
  }
  render() {
    return (
      <Modal
      isVisible={this.state.visible}
      onSwipeComplete={() => this.setState({visible: false })}
      swipeDirection={[ 'down']}
      onBackButtonPress={()=>this.hideModal()}
      onBackdropPress={() => this.setState({ visible: false })}
      style={styles.bottomModal}
    >
      <View style={{backgroundColor:'#fff',borderTopLeftRadius:borderRadius,borderTopRightRadius:borderRadius}}>

      {this.props.children}
      </View>
    </Modal>
    );
  }
}

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default Bottomsheet;
