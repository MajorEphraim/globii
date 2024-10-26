import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions, 
        TouchableWithoutFeedback, FlatList, Image, 
        SafeAreaView, TextInput, Keyboard,
        ScrollView
    } from 'react-native'
import StatusBarComp from '../components/StatusBarComp'
import HeaderComp from '../components/HeaderComp'
import SearchBarComp from '../components/SearchBarComp'
import SubjectsComp from '../components/SubjectsComp'
import MyProblemComp from '../components/MyProblemComp'
import ImagesComp from '../components/ImagesComp'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch,useSelector } from 'react-redux'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const MyProblemsScreen = ()=>{
    
    const route = useRoute()
    const navigation = useNavigation()
    const problems = useSelector(state=>state.problemsState.allProblems)
   
    const userId = useSelector(state=>state.authState.userToken)

    const data = problems.filter(item=>item.creator == userId)
    const [search, setSearch] = useState('')

    const theme = useSelector(state=>state.themeState)
    const text = theme.themeName
    const themeColor = theme.themeColor
    const backgroundColor = theme.backgroundColor
    const textColor = theme.textColor
    const iconColor = theme.iconColor
    const btnTextColor = theme.btnTextColor

    return(
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={{flex:1,backgroundColor, paddingHorizontal:0.05*width}}>
                <HeaderComp heading={"My Problems"} handlePress={()=>navigation.goBack()}/>
                <SearchBarComp placeholder={`...search problem`} setSearch={setSearch} search={search}/>
                {
                data.length > 0 ?(
                    <View style={{flex:1, alignItems:'center', justifyContent:'space-between', paddingBottom:0.06*height}}>
                        <View style={{flex:1, width:'100%', paddingTop:0.06*height}}>
                            <FlatList
                                data={data.length ==0 ?data :data.filter(item=>item.heading.toLowerCase().indexOf(search.toLowerCase()) !== -1)}
                                keyExtractor={item=>item.id}
                                renderItem={({item,index})=>(
                                    <MyProblemComp problem={item} openProblem={()=>navigation.navigate('View problem',{problemId:item.id})}/>
                                )}/>
                        </View>
                        
                    </View>
                ):(
                    <View style={{flex:1, alignItems:'center', justifyContent:'center', paddingBottom:0.4*width }}>
                        <Text style={{fontSize:0.11*width, fontWeight:'600' ,color:themeColor, opacity:0.22}}>No problem available yet</Text>
                    </View>
                )
            }
              
               
            </View>
        </TouchableWithoutFeedback>
    )

}

export default MyProblemsScreen
