import React from 'react'
import { View, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import CustomText from 'AppLevelComponents/UI/CustomText'
import Icons from 'AppLevelComponents/UI/Icons'
import {Colors} from "UIProps/Colors";
import Fonts from "UIProps/Fonts";
import * as Animatable from 'react-native-animatable';

let iconSize = 15
const InfoParent = () => {
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
                  text={'Add announcements and school meets to calendar'}
                  color={Colors.black}
                  style={{ marginLeft: 10 }}
                  size={15}
                  font={Fonts.heavy}
                />
              </View>


              <View style={styles.infoPoints}>
                <Icons
                  lib="Material"
                  name="calendar-clock"
                  size={iconSize}
                  color="#FB9314"
                />

                <CustomText
                  text={'Check fee history'}
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
                  text={'Apply for leaves on behalf of their kid'}
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

export default InfoParent
