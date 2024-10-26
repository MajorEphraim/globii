import React from "react";
import { View, Text, TouchableOpacity, Dimensions,TouchableWithoutFeedback, Alert  } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import deleteProblem from '../functions/deleteProblem'
import { useSelector } from 'react-redux';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const MyProblemComp =({problem, openProblem})=>{

    const theme = useSelector(state=>state.themeState)
    const text = theme.themeName
    const themeColor = theme.themeColor
    const backgroundColor = theme.backgroundColor
    const textColor = theme.textColor
    const iconColor = theme.iconColor
    const btnTextColor = theme.btnTextColor

    const confirmDelete= async() =>{
        await deleteProblem(problem.id)
    }

    const createAlert = () =>
    Alert.alert('Confirm deletion', 'Are you sure you want to delete this problem ?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'Confirm', onPress: confirmDelete},
    ]);

    return (
        <TouchableOpacity 
            onPress={openProblem}
            style={{marginVertical:.0099*height, paddingBottom:.003*height, borderBottomColor:textColor, borderBottomWidth:.5, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{fontSize:.05*width, color:textColor}}>{problem.heading}</Text>
            <TouchableOpacity onPress={createAlert} >
                <MaterialIcons name="delete" size={0.05*width} color={textColor} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default MyProblemComp