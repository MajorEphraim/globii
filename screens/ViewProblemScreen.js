import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Dimensions, 
        TouchableWithoutFeedback, FlatList, Image, 
        SafeAreaView, TextInput, Keyboard,
        ScrollView
    } from 'react-native'
import StatusBarComp from '../components/StatusBarComp'
import HeaderComp from '../components/HeaderComp'
import SearchBarComp from '../components/SearchBarComp'
import SubjectsComp from '../components/SubjectsComp'
import ProblemComp from '../components/ProblemComp'
import ImagesComp from '../components/ImagesComp'
import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux'
import {functions, httpsCallable} from '../firebase/configs'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width



const ViewProblemScreen = ()=>{
    
    const route = useRoute()
    const navigation = useNavigation()

    const problems = useSelector(state=>state.problemsState.allProblems)
    const userId = useSelector(state=>state.authState.userToken)

    const problemId =route.params.problemId
    const problem = problems && problems.filter(item=>item.id == problemId)[0]
    const pics = problem.pics

    const theme = useSelector(state=>state.themeState)
    const text = theme.themeName
    const themeColor = theme.themeColor
    const backgroundColor = theme.backgroundColor
    const textColor = theme.textColor
    const iconColor = theme.iconColor
    const viewProbBackground = theme.viewProbBackground
    const headingColor = theme.headingColor
    const btnIconCol = theme.btnIconCol
    
    useEffect(()=>{
        const viewProblem = httpsCallable(functions, 'viewProblem');
        let isOn = true
        if(isOn){
                viewProblem({problemId})
            try{
            }catch(e){
                console.log(e.message)
            }
        }
    
        return()=>{
            isOn = false
        }
    },[])

    const addProblem = ()=>{
        alert("fine")
    }

    const textCol = backgroundColor === "#0e0c0c" ? "#0e0c0c":textColor
    const dateCol = backgroundColor === "#0e0c0c" ? "#0e0c0c":themeColor
    const iconCol = backgroundColor === "#0e0c0c" ? "#0e0c0c":text

    return(
            <>
            <View style={{flex:1,backgroundColor, paddingHorizontal:0.05*width}}>
                <HeaderComp heading={"View Problem"} handlePress={()=>navigation.goBack()}/>
                <View style={{flex:1, justifyContent:'space-between'}}>
                        <View style={{width:'100%'}}>
                            <Text style={{fontSize:0.06*width, color:textColor, marginBottom:0.05*height}}>{problem.heading}</Text>
                            <View style={{ flexDirection:'row',justifyContent:'space-between',alignItems:'center', height:0.061*height, backgroundColor:viewProbBackground, padding:0.02*width, borderRadius:0.02*width}}>
                                <Text  style={{color:dateCol, fontSize:0.034*width}}>{problem.dateCreated}</Text>
                                <View style={{alignItems:'center', padding:2}}>
                                  <Entypo name='eye' size={0.035*width} color={textCol} />
                                  <Text style={{fontSize:0.035*width, color:textCol}}>{problem.views.length}</Text>
                                </View>
                            </View>
                            <Text style={{fontSize:0.045*width,color:textColor, marginTop:20}}>{pics.length == 0 ? problem.description : null}</Text>           
                            
                        </View>
                    </View>
                { pics.length == 0 ? (null):(
                    <View style={{width:'100%', height:0.65*height}}>
                        <ScrollView style={{width:'100%'}}>
                            {
                                problem.description == "" ? null :(
                                    <>
                                <Text style={{fontSize:0.045*width,color:textColor, marginTop:20}}>{problem.description}</Text>           
                                    </>
                                )
                            }
                        <ImagesComp pics={pics}/>
                        </ScrollView>
                    </View>
                )
                }
                
            </View>
                <View style={{flexDirection:'row',width:'100%', height:0.1*height, alignItems:'center', justifyContent:'center', position:'absolute', top:'87%',}}>

                    <View style={{flexDirection:'row',width:'95%', height:0.1*height, alignItems:'center', justifyContent:'space-between',  backgroundColor:'transparent', borderRadius:0.05*width, padding:10}}>
                            {
                                problem.creator !== userId ? (
                                    <TouchableWithoutFeedback onPress={()=>navigation.navigate('Add solution',{problemHeading:problem.heading, problemId:problem.id})}>
                                <View style={{alignItems:'center'}}>
                                    <View style={{alignItems:'center',justifyContent:'center',height:.2*width, width:.2*width, backgroundColor:themeColor, borderRadius:100}}>
                                        <AntDesign name='edit' color={btnIconCol} size={.07*width}/>
                                        <Text style={{color:btnIconCol, fontSize:.03*width}}>Solve</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                                ):(
                            <TouchableWithoutFeedback onPress={()=>navigation.navigate('Update problem',{problemHeading:problem.heading, problemId:problem.id})}>
                                <View style={{alignItems:'center'}}>
                                    <View style={{alignItems:'center',justifyContent:'center',height:.2*width, width:.2*width, backgroundColor:themeColor, borderRadius:100}}>
                                    <AntDesign name='edit' color={btnIconCol} size={.07*width}/>
                                        <Text style={{color:btnIconCol, fontSize:.03*width}}>Update</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                                )
                            }
                            
                            <TouchableWithoutFeedback onPress={()=>navigation.navigate('Solutions',{problemId:problem.id})}>
                                <View style={{alignItems:'center'}}>
                                    <View style={{alignItems:'center',justifyContent:'center',height:.2*width, width:.2*width, backgroundColor:headingColor, borderRadius:100}}>
                                        <AntDesign name='solution1' color={btnIconCol} size={.07*width}/>
                                        <Text style={{color:btnIconCol, fontSize:.03*width}}>Solutions</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View> 
                    </View>
            
            </>
    )

}

export default ViewProblemScreen
