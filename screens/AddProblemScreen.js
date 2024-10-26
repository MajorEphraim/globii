import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions, 
        TouchableWithoutFeedback, FlatList, Image, 
        SafeAreaView, TextInput, Keyboard,
        ScrollView } from 'react-native'
import StatusBarComp from '../components/StatusBarComp'
import HeaderComp from '../components/HeaderComp'
import SearchBarComp from '../components/SearchBarComp'
import SubjectsComp from '../components/SubjectsComp'
import ProblemComp from '../components/ProblemComp'

import { updateIsAgreed } from '../redux/slices/firstTimeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native';

import Entypo from 'react-native-vector-icons/Entypo';

import openCamera from '../functions/openCamera'
import openMedia from '../functions/openMedia'
import uploadProblem from '../functions/uploadProblem'

import Loader from '../modals/Loader'
import {functions, httpsCallable} from '../firebase/configs'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


const AddProblemScreen = ()=>{
    const updateFavorites = httpsCallable(functions, 'updateFavorites');

    const [pics, setPics] = useState([])
    const [heading, setHeading] = useState('')
    const [description, setDescription] = useState('')
    const [topic, setTopic] = useState('')
    const [isVisible, setIsVisible] = useState(false)


    const route = useRoute()
    const params = route.params
    const subject = topic.length>0 ? topic : params.subject

    const navigation = useNavigation()
    const accountDetails = useSelector(state=>state.accountState)
    const userId = useSelector(state=>state.authState.userToken)

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

    const iconCol = backgroundColor === "#0e0c0c" ? "#0e0c0c":btnIconCol
    const placeholderColor = backgroundColor === "#0e0c0c" ? inputTextCol:placeholderCol
    const inputTextColor = backgroundColor === "#0e0c0c" ? placeholderCol:inputTextCol
    
    const addProblem = async()=>{
       try {
        setIsVisible(true)
        const problemId = await uploadProblem(heading, description, subject, pics, userId)
        updateFavorites({problemId, subject})
        setTimeout(()=>{
            setIsVisible(false)
            navigation.goBack()
        },1000)
       } catch (error) {
            console.log("ERROR", error.message)
       }
    }

    const runOpenCamera = async()=>{
        try {
            const {uri, name} = await openCamera()
            setPics(prevState=>[...prevState,{uri, name}])  
            
        } catch (error) {
            console.log("ERROR",error.message)
        }
    }

    const runOpenMedia = async()=>{
        try {
            const {uri, name} = await openMedia()
            setPics(prevState=>[...prevState,{uri, name}])  
            
        } catch (error) {
            console.log("ERROR",error.message)
        }
    }


    const isShown =  heading.length >0 && description.length >0 || heading.length >0 && pics.length >0

    return(
            <View style={{flex:1,backgroundColor, paddingHorizontal:0.05*width}}>
                <HeaderComp heading={"Create Problem"} handlePress={()=>navigation.goBack()}/>
                <View style={{flex:1, alignItems:'center', justifyContent:'space-between'}}>
                    <ScrollView style={{width:'100%'}}>
                        <View style={{flex:1, justifyContent:'space-between',alignItems:'center', width:'100%', paddingTop:0.06*height}}>
                            <View style={{width:'100%'}}>
                                <TextInput
                                    placeholder={"Problem title / Topic"}
                                    placeholderTextColor={placeholderColor}
                                    multiline={true}
                                    style={{fontSize:0.065*width, fontWeight:'bold', color:inputTextColor}}
                                    onChangeText={(text)=>setHeading(text)}
                                    
                                    />

                                <TextInput
                                    placeholder={"Describe your problem here"}
                                    placeholderTextColor={placeholderColor}
                                    multiline={true}
                                    style={{fontSize:0.05*width, fontWeight:'bold', color:inputTextColor, marginTop:0.034*height}}
                                    onChangeText={(text)=>setDescription(text)}
                                    />
                                
                            </View>
                            <View style={{ height:.3*width, marginTop:.1*width}}>
                                {
                                    pics.length > 1 ?(
                                        <FlatList
                                        data={pics}
                                        key={"_"}
                                        horizontal={true}
                                        keyExtractor={item=>item.uri}
                                        renderItem={({item})=>(
                                            <Image
                                            source={{uri:item.uri}}
                                            style={{width:.3*width, height:.3*width, marginHorizontal:.03*width}}
                                            />
                                            )}
                                            />
                                            ):(
                                                <Image
                                                source={pics[0] && {uri:pics[0].uri}}
                                                style={{width:.3*height, height:.3*height}}
                                                />
                                                )
                                            }
                            </View>
                        </View>
                    </ScrollView>
                        {pics.length==0 ?(
                            <Text style={{color:'#a7a5a5', fontSize:0.035*width, fontWeight:'bold'}}>Or attach it</Text>
                        ):(null)
                        }
                    <View style={{width:'100%', alignItems:'center'}}>
                        { isShown?(
                         <TouchableWithoutFeedback onPress={addProblem}>
                            <View style={{alignItems:'center',justifyContent:'center',height:.055*height, width:.56*width, backgroundColor:themeColor, marginTop:.035*height, marginBottom:0.06*height}}>
                                <Text style={{color:iconCol, fontSize:.025*height}}>Add problem</Text>
                            </View>
                         </TouchableWithoutFeedback>
                        ):(
                            <View style={{height:.055*height, width:.56*width, marginTop:.035*height, marginBottom:0.06*height}}/>
                            )}
                        <View style={{flexDirection:'row', justifyContent:'space-between', position:'absolute',width:'100%', top:'65%'}}>
                            <TouchableWithoutFeedback onPress={runOpenCamera}>
                                <Entypo name="camera" size={0.06*width} color={themeColor} />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={runOpenMedia}>
                                <Entypo name="images" size={0.06*width} color={themeColor} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>  
                </View>
                <Loader isVisible={isVisible} setIsVisible={setIsVisible}/>
            </View>
    )

}

export default AddProblemScreen
