import React, { useState } from 'react'
import { View, Text, TouchableOpacity, 
        Dimensions, Modal,
        TouchableWithoutFeedback, 
    } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const ChangeProfile = ({isVisible, setIsVisible,runOpenMedia, runOpenCamera})=>{

    const theme = useSelector(state=>state.themeState)
    const text = theme.themeName
    const themeColor = theme.themeColor
    const backgroundColor = theme.backgroundColor
    const textColor = theme.textColor
    const iconColor = theme.iconColor
    const viewProbBackground = theme.viewProbBackground
    const headingColor = theme.headingColor
    const btnIconCol = theme.btnIconCol
    const inputTextCol = theme.inputTextCol
    const placeholderCol = theme.placeholderCol

    return(
        <Modal visible={isVisible}  transparent={true} animationType='fade' style={{flex:1}}>
            <TouchableWithoutFeedback onPress={()=>setIsVisible(false)}>
                <View style={{flex:1, justifyContent:'flex-end', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.5)', paddingBottom:1}}>
                    <View style={{flexDirection:'row',width:'100%', alignItems:'center', justifyContent:'space-between', backgroundColor, borderRadius:0.05*width,paddingHorizontal:'7%',paddingVertical:"7%"}}> 
                            <TouchableOpacity style={{alignItems:'center'}} onPress={runOpenCamera}>
                                <Entypo name="camera" size={0.2*width} color={themeColor} />
                                <Text style={{color:headingColor, fontSize:.03*width}}>Camera</Text>
                            </TouchableOpacity>
                               
                            <TouchableOpacity style={{alignItems:'center'}} onPress={runOpenMedia}>
                                <Entypo name="images" size={0.2*width} color={themeColor} />
                                <Text style={{color:headingColor, fontSize:.03*width}}>Gallery</Text>
                            </TouchableOpacity>      
                    </View>
                </View>  
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default ChangeProfile