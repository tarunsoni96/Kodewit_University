import React from 'react'
import { View, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import CustomText from 'AppLevelComponents/UI/CustomText'
import Icons from 'AppLevelComponents/UI/Icons'
import {Colors} from "UIProps/Colors";
import Fonts from "UIProps/Fonts";
import * as Animatable from 'react-native-animatable';

let iconSize = 15
const InfoStudent = () => {
    return (
      <Animatable.View animation='fadeIn' useNativeDriver={true} duration={800}  style={{ flex:1,width:'100%'}}>
        <View style={styles.infoPoints}>
                <Icons
                  lib="AntDesign"
                  name="calendar"
                  size={iconSize}
                  color="#FB9314"
                />

                <CustomText
                  text={'Check student time table'}
                  color={Colors.black}
                  style={{ marginLeft: 10 }}
                  size={15}
                  font={Fonts.heavy}
                />
              </View>


              <View style={styles.infoPoints}>
                <Icons
                  lib="SimpleLine"
                  name="notebook"
                  size={iconSize}
                  color="#FB9314"
                />

                <CustomText
                  text={'Check books and their availability in Library'}
                  color={Colors.black}
                  style={{ marginLeft: 10 }}
                  size={15}
                  font={Fonts.heavy}
                />
              </View>



              <View style={styles.infoPoints}>
              <Icons
                  lib="Entypo"
                  name="documents"
                  size={iconSize}
                  color="#FB9314"
                />

                <CustomText
                  text={'Check academic records'}
                  color={Colors.black}
                  style={{ marginLeft: 10 }}
                  size={15}
                  font={Fonts.heavy}
                />
              </View>


              <View style={styles.infoPoints}>
              <Icons
                  lib="SimpleLine"
                  name="calendar"
                  size={iconSize}
                  color="#FB9314"
                />

                <CustomText
                  text={'Apply for leaves using leave management system'}
                  color={Colors.black}
                  style={{ marginLeft: 10 }}
                  size={15}
                  font={Fonts.heavy}
                />
              </View>



              </Animatable.View>
    )
}

const styles = EStyleSheet.create({
    infoPoints: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 13,
      },
})

export default InfoStudent
