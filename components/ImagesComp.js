import React from "react";
import { View, Text, TouchableOpacity, Dimensions, Platform, Image  } from 'react-native'
import { StatusBar } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const ImagesComp=({pics})=>{
   
    return(
        <View style={{ width:'100%', alignItems:'center'}}>
        {
            pics.map(url=>(
                <Image
                key={url}
                source={{uri:url}}
                style={{ width:'100%',height:.65*width, borderRadius:0.07*width, marginBottom:20}}
                /> 
                ))
            }
    </View> 
    )
}

export default ImagesComp