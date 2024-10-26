import  * as React from 'react';
import { View, Text, TouchableOpacity, Dimensions, 
        TouchableWithoutFeedback, FlatList, Image, 
        SafeAreaView, TextInput, Keyboard, ScrollView, Alert } from 'react-native'
import StatusBarComp from '../components/StatusBarComp'
import HeaderComp from '../components/HeaderComp'
import SolutionComp from '../components/SolutionComp'
import CommentsModal from '../modals/CommentsModal'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import updateProblemCase from '../functions/manageProblem'
import fetchComments from '../functions/fetchComments'

const Solutions = ()=>{
    return(
        <Text>HELLO</Text>
    )
}

export default Solutions