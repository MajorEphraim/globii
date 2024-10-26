import React from "react";
import { View, Text, TouchableOpacity, Dimensions,TouchableWithoutFeedback  } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const ProblemComp =({problem,caseClosed,openProblem, views})=>{
    const userId = useSelector(state=>state.authState.userToken)
    const theme = useSelector(state=>state.themeState)
    const text = theme.themeName
    const themeColor = theme.themeColor
    const backgroundColor = theme.backgroundColor
    const textColor = theme.textColor
    const iconColor = theme.iconColor
    const btnTextColor = theme.btnTextColor
    return (
        <TouchableOpacity 
            onPress={openProblem}
            style={{marginVertical:.0099*height, paddingBottom:.003*height, borderBottomColor:textColor, borderBottomWidth:.5, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{fontSize:.05*width, color:textColor, fontWeight:!views.includes(userId) ? 'bold':'normal'}}>{problem}</Text>
        {
            caseClosed ? (
                <View style={{flexDirection:'column', alignItems:'center'}}>
                    <Ionicons name="lock-closed" size={0.05*width} color={themeColor} />
                    <Text style={{color:textColor, fontSize:0.028*width}}>Case closed</Text>
                </View>
            ):(
                <View style={{flexDirection:'column', alignItems:'center'}}>
                 <Ionicons name="lock-open" size={0.05*width} color={themeColor} />
                 <Text style={{color:textColor, fontSize:0.028*width}}>Case open</Text>
                </View>
            )
        }

        </TouchableOpacity>
    )
}

export default ProblemComp