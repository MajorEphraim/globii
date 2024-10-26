import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Dimensions, TouchableWithoutFeedback, FlatList  } from 'react-native'
import StatusBarComp from '../components/StatusBarComp'
import HeaderComp from '../components/HeaderComp'
import SearchBarComp from '../components/SearchBarComp'
import SubjectsComp from '../components/SubjectsComp'
import ProblemComp from '../components/ProblemComp'
import { updateIsAgreed } from '../redux/slices/firstTimeSlice'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { fetchAllSolutions } from '../functions/fetchContent'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const SubjectScreen = ()=>{
    
    const route = useRoute()
    const navigation = useNavigation()
    const problems = useSelector(state=>state.problemsState.allProblems)
    const subject = route.params
    const userId = useSelector(state=>state.authState.userToken)

    const data = problems.filter(item=>item.subject == subject.name && item.creator !== userId)

    const theme = useSelector(state=>state.themeState)
    const text = theme.themeName
    const themeColor = theme.themeColor
    const backgroundColor = theme.backgroundColor
    const textColor = theme.textColor
    const iconColor = theme.iconColor

    const [search, setSearch] = useState('')

    useEffect(()=>{
        if(problems.length>0)
            fetchAllSolutions(problems)
    },[problems])

    return(
        <>
        <View style={{flex:1,backgroundColor, paddingHorizontal:0.05*width}}>
            <HeaderComp heading={subject.name} handlePress={()=>navigation.goBack()}/>
            <SearchBarComp placeholder={`...search ${subject.name.toLowerCase()} problem`} setSearch={setSearch} search={search}/>
            {
                data.length > 0 ?(
                    <View style={{flex:1, alignItems:'center', justifyContent:'space-between', paddingBottom:0.06*height}}>
                        <View style={{flex:1, width:'100%', paddingTop:0.06*height}}>
                            <FlatList
                                data={data.length ==0 ?data :data.filter(item=>item.heading.toLowerCase().indexOf(search.toLowerCase()) !== -1)}
                                keyExtractor={item=>item.id}
                                renderItem={({item,index})=>(
                                    <ProblemComp problem={item.heading} caseClosed = {item.caseClosed} openProblem={()=>navigation.navigate('View problem',{problemId:item.id})} views={item.views}/>
                                )}/>
                        </View>
                        
                    </View>
                ):(
                    <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'space-around', paddingBottom:0.4*width, paddingHorizontal:0.14*width }}>
                        <Text style={{fontSize:0.11*width, fontWeight:'600' ,color:themeColor, opacity:0.22}}>No problem available yet</Text>
                        <View style={{flexDirection:'column', alignItems:'center',}}>
                            <Text style={{fontSize:0.06*width, fontWeight:'600' ,color:themeColor, opacity:0.22,marginBottom:0.05*width, fontStyle:'italic'}}>Problems belonging to you are excluded here</Text>
                            <Text style={{fontSize:0.06*width, fontWeight:'600' ,color:themeColor, opacity:0.22, fontStyle:'italic'}}>Find them in My problems screen</Text>
                        </View>
                    </View>
                )
            }
        </View>
        <View style={{flexDirection:'row', height:0.1*height, width:.2*width,alignItems:'center', justifyContent:'flex-end', position:'absolute', top:'87%', left:'80%',  padding:15}}>
                            
                        <TouchableWithoutFeedback onPress={()=>navigation.navigate("Add problem",{subject:subject.name})}>
                            <View style={{alignItems:'center'}}>
                                <View style={{alignItems:'center',justifyContent:'center',height:.2*width, width:.2*width, backgroundColor:themeColor, borderRadius:100}}>
                                    <AntDesign name='addfile' color={"#fefcfe"} size={.07*width}/>
                                    <Text style={{color:"#fefcfe", fontSize:.03*width}}>Problem</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
        </View>
        </>
    )

}

export default SubjectScreen