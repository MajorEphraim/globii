import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions, 
        TouchableWithoutFeedback, FlatList, Image, 
        SafeAreaView, TextInput, Keyboard, ScrollView, Alert } from 'react-native'
import StatusBarComp from '../components/StatusBarComp'
import HeaderComp from '../components/HeaderComp'
import SearchBarComp from '../components/SearchBarComp'
import SubjectsComp from '../components/SubjectsComp'
import ProblemComp from '../components/ProblemComp'
import SolutionComp from '../components/SolutionComp'
import CommentsModal from '../modals/CommentsModal'
import { updateIsAgreed } from '../redux/slices/firstTimeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import updateProblemCase from '../functions/manageProblem'
import fetchComments from '../functions/fetchComments'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const SolutionsScreen = ()=>{

    const route = useRoute()
    const navigation = useNavigation()
    const problems = useSelector(state=>state.problemsState.allProblems)
    const allSolutions = useSelector(state=>state.solutionsState.allSolutions)
    
    const problemId = route.params.problemId
    const problem = problems.filter(item=>item.id == problemId)[0]
    
    const solutions = allSolutions.filter(item=>item.problemId == problemId)
    const solvers = useSelector(state=>state.solversState.solvers)
    const userId = useSelector(state=>state.authState.userToken)

    const [isVisible, setIsVisible] = useState(false)
    const [solutionId, setSolutionId] = useState(null)
    const [solver, setSolver] = useState(null)

    const theme = useSelector(state=>state.themeState)
    const text = theme.themeName
    const themeColor = theme.themeColor
    const backgroundColor = theme.backgroundColor
    const textColor = theme.textColor
    const iconColor = theme.iconColor
    const viewProbBackground = theme.viewProbBackground
    const headingColor = theme.headingColor
    const btnIconCol = theme.btnIconCol

    const getSolver = (id)=>{
        const solver = solvers.filter(item=>item.solutionId === id)[0]
        //console.log("SOLsolvers ", solvers)
        return solver
    }

    const confirmChange= async() =>{
        await updateProblemCase(!problem.caseClosed, problem.id)
    }

    const createAlert = () =>
    Alert.alert('Confirmation',problem.caseClosed ? 'Everyone will be able to send solutions after opening the case': 'No one will be able to send any solutions after closing the case', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text:problem.caseClosed ?'Open':'Close', onPress: confirmChange},
    ]);

    const openComments=async(id)=>{
        setSolutionId(id)
        setSolver(getSolver(id))
        await fetchComments(id)
        setIsVisible(true)
    }

    const textCol = backgroundColor === "#0e0c0c" ? "#0e0c0c":textColor
    const dateCol = backgroundColor === "#0e0c0c" ? "#0e0c0c":themeColor
    const iconCol = backgroundColor === "#0e0c0c" ? "#0e0c0c":btnIconCol
    const iconCol2 = backgroundColor === headingColor ? headingColor:themeColor

    return(
        <>
            <View style={{flex:1,backgroundColor, paddingHorizontal:0.05*width}}>
                <HeaderComp heading={problem.heading} handlePress={()=>navigation.goBack()}/>
                {
                    solutions.length > 0 ?(
                        <View style={{flex:1, alignItems:'center', justifyContent:'space-between'}}>  
                            <ScrollView style={{width:'100%',}}>
                                <View style={{ height:'100%', width:'100%'}}>
                                    {
                                        solutions.map((item,index)=>(
                                            <SolutionComp key={index.toString()} number={index+1} solution={item} solver={getSolver(item.id)} setIsVisible={setIsVisible} openComments={openComments}/>
                                            ))
                                        }
                                </View>
                            </ScrollView>              
                            
                        </View>

                    ):(
                    <View style={{flex:1, alignItems:'center', justifyContent:'center', paddingBottom:0.4*width }}>
                        <Text style={{fontSize:0.11*width, fontWeight:'600' ,color:themeColor, opacity:0.22}}>No solution available yet</Text>
                    </View>
                    )
                }
            </View>

            <View style={{flexDirection:'row', height:0.1*height, width:.2*width,alignItems:'center', justifyContent:'flex-end', position:'absolute', top:'87%', left:10,}}>                            
                        {
                            problem.creator === userId ? (
                            <TouchableWithoutFeedback onPress={createAlert}>
                                <View style={{alignItems:'center'}}>
                                    {
                                        problem.caseClosed ? (
                                        
                                            <View style={{alignItems:'center',justifyContent:'center',height:.2*width, width:.2*width, backgroundColor:themeColor, borderRadius:100}}>
                                                <Ionicons name='lock-open' color={btnIconCol} size={.07*width}/>
                                                <Text style={{color:btnIconCol, fontSize:.03*width}}>Open case</Text>
                                            </View>
                                        ):(
                                            
                                            <View style={{alignItems:'center',justifyContent:'center',height:.2*width, width:.2*width, backgroundColor:themeColor, borderRadius:100}}>
                                                <Ionicons name='lock-closed' color={btnIconCol} size={.07*width}/>
                                                <Text style={{color:btnIconCol, fontSize:.03*width}}>Close case</Text>
                                            </View>
                                        )
                                    }
                                </View>
                            </TouchableWithoutFeedback>
                            ):null
                        }
            </View>

            {
                problem.creator !== userId ? (
                    <View style={{flexDirection:'row', height:0.1*height, width:.2*width,alignItems:'center', justifyContent:'flex-end', position:'absolute', top:'87%', right:10,  }}>                            
                            <TouchableWithoutFeedback onPress={()=>navigation.navigate('Add solution',{problemId:problem.id})}>
                                <View style={{alignItems:'center'}}>
                                    <View style={{alignItems:'center',justifyContent:'center',height:.2*width, width:.2*width, backgroundColor:headingColor, borderRadius:100}}>
                                    <AntDesign name='addfile' color={iconCol} size={.07*width}/>
                                        <Text style={{color:iconCol, fontSize:.03*width}}>Solution</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                    </View>

                ):null
            }
            <CommentsModal isVisible={isVisible} setIsVisible={setIsVisible} solutionId={solutionId} solver={solver}/>
        </>
    )

}

export default SolutionsScreen
