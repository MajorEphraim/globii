import React from "react";
import { View, Text, TouchableOpacity, Dimensions, Platform  } from 'react-native'
import { StatusBar } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


const HeaderComp =({heading,handlePress,isCheck, handleUpdate})=>{

    const theme = useSelector(state=>state.themeState)
    const text = theme.themeName
    const themeColor = theme.themeColor
    const backgroundColor = theme.backgroundColor
    const headingColor = theme.headingColor


    const checkComp = heading.toLowerCase() == 'my account' && isCheck ? (
        <TouchableOpacity onPress={handleUpdate}>
            <MaterialIcons name="done" color={themeColor} size={0.06*width}/>
        </TouchableOpacity>
    ):(<View/>)
    return(
        <View style={{backgroundColor:backgroundColor, height:0.175*height,justifyContent:'space-between', paddingTop: Platform.OS == 'android' ? 0.04*height : 0.06*height}}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    {
                        heading.toLowerCase() == 'all problems' ?(
                            <View>
                            </View>
                        ):(
                            <TouchableOpacity onPress={handlePress}>
                                <AntDesign name="arrowleft" size={0.06*width} color={themeColor} />
                            </TouchableOpacity>
                        )

                    }

                    {
                        heading.toLowerCase() == 'all problems' ?(
                            <TouchableOpacity onPress={handlePress}>
                                <Entypo name="dots-three-vertical" size={0.06*width} color={themeColor} />
                            </TouchableOpacity>
                        ):(
                            checkComp
                        )

                    }
                </View>
                <View style={{alignItems:'flex-start'}}>
                    <Text ellipsizeMode='middle' numberOfLines={1} style={{fontSize:.08*width, color:headingColor, fontWeight:'bold'}}>{heading}</Text>
                </View>
          
        </View>
    )


}

export default HeaderComp