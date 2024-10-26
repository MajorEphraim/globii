import React, { useState } from 'react'
import { View, Text, TouchableOpacity, 
        Dimensions, Modal, Platform,
        TouchableWithoutFeedback} from 'react-native'
import { updateIsAgreed } from '../redux/slices/firstTimeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const data = [{name:'Account', isFrom:'home'}, {name:'Ratings', isFrom:'home'}, {name:'My problems', isFrom:'home'}, {name:'Settings', isFrom:'home'}]

const HomeModal = ({setIsVisible, isVisible})=>{
    //const [textColor, setTextColor] = useState("#fefcfe")
    const [isDisplayed, setIsDisplayed] = useState(false)

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

    const dispatch = useDispatch()
    const navigation = useNavigation()


    const backColor = backgroundColor === "#0e0c0c" ? "#000000":'#f6f6f6'
    return(
        <Modal visible={isVisible}  transparent={true} animationType='fade' style={{flex:1}}>
            <TouchableWithoutFeedback onPress={()=>setIsVisible(false)}>

                <View style={{flex:1, alignItems:'flex-end'}}>
                    <View style={{width:0.45*width ,padding:5, backgroundColor:backColor, marginTop:Platform.OS == 'android' ? 0.01*height : 0.04*height}}>
                        {
                            data.map(item=>(
                                <TouchableOpacity key={item.name} onPress={()=>{setIsVisible(false);navigation.navigate(item.name,item)}} style={{height:0.1*width, justifyContent:'center'}}>
                                    <Text style={{color:headingColor, fontSize:0.04*width, fontWeight:'400'}}>{item.name == 'Account' ? 'My account' : item.name}</Text>
                                </TouchableOpacity>

                            ))
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>

    )
}

export default HomeModal