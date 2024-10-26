import React from "react";
import { View, Text, TouchableOpacity, Dimensions, TextInput  } from 'react-native'
import { StatusBar } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const SearchBarComp =({placeholder, setSearch, search})=>{

    const theme = useSelector(state=>state.themeState)
    const text = theme.themeName
    const themeColor = theme.themeColor
    const backgroundColor = theme.backgroundColor
    const textColor = theme.textColor
    const iconColor = theme.iconColor
    const placeholderColor = theme.placeholderColor

    return(
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={placeholderColor}
                onChangeText={txt=>setSearch(txt)}
                value={search}
                style={{ justifyContent:'flex-end', backgroundColor:themeColor, height:0.1*width, width:0.66*width, borderRadius:0.02*width, marginTop:0.025*height,padding:6, fontSize:0.038*width, paddingTop:15}}
            />
    )
}

export default SearchBarComp