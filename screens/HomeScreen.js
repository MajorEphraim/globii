import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Dimensions, } from 'react-native'
import StatusBarComp from '../components/StatusBarComp'
import HeaderComp from '../components/HeaderComp'
import SearchBarComp from '../components/SearchBarComp'
import SubjectsComp from '../components/SubjectsComp'
import HomeModal from '../modals/HomeModal'
import { updateIsAgreed } from '../redux/slices/firstTimeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import {fetchContent, fetchAllSolutions} from '../functions/fetchContent'
import {data} from '../constants/data'
import { updateFavorites } from '../redux/slices/favoritesSlice'
import fetchHelpers from '../functions/fetchTopHelpers';
import Favorite from '../modals/Favorites'
import { signInUser} from '../redux/slices/authSlice'
import { auth, onAuthStateChanged } from '../firebase/configs'
import {fetchFavorites, fetchDocs }from '../functions/fetchFavorites'
import * as SecureStore from 'expo-secure-store';
import Loader from '../modals/Loader'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const HomeScreen = ()=>{
    const [isVisible, setIsVisible] = useState(false)
    const [isShown, setIsShown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [search, setSearch] = useState('')
    const chosen = useSelector(state=>state.favoritesState)
    const topics = chosen.favorites
    const userId = useSelector(state=>state.authState.userToken)
    const allProblems = useSelector(state=>state.problemsState.allProblems)

    const [modalTopics, setModalTopics] = useState([])

    const navigation = useNavigation()
    const dispatch = useDispatch()


    const theme = useSelector(state=>state.themeState)
    const text = theme.themeName
    const themeColor = theme.themeColor
    const backgroundColor = theme.backgroundColor
    const textColor = theme.textColor
    const iconColor = theme.iconColor


    const setLocalFav =async(fav)=>{
        await JSON.parse(await SecureStore.setItemAsync('chosen_subjects', JSON.stringify(fav)))
    }

    const getLocalFav =async()=>{
       
    
        const chosenSubjects = JSON.parse(await SecureStore.getItemAsync('chosen_subjects'))
            if (chosenSubjects != null) {
                if(chosenSubjects.length >0){
                    if(topics.length === 0 && userId === null)
                        dispatch(updateFavorites(chosenSubjects))
                    
                    await fetchContent(chosenSubjects)
                   
                }
            }

            return chosenSubjects == null ? [] : chosenSubjects

    }

    const checkIfUploaded = async(userId)=>{
       
        const chosenSubjects = await getLocalFav()
        setModalTopics(chosenSubjects)
        fetchContent(chosenSubjects)  
        const arr = await fetchDocs(userId)
       
        if(arr.length ===0 && chosenSubjects.length >0 && userId !== null){
            setIsShown(true)
        }
    }

    useEffect(()=>{

        (async()=>{
            setIsFetching(true)
            const fav = await getLocalFav()
            setIsFetching(false)
            if(fav.length ===0){
                const arr = await fetchDocs(userId)
                setLocalFav(arr)
            }
        })()
    },[])

    useEffect(()=>{
       (async()=>{
          
        if(allProblems.length >0){
            fetchAllSolutions(allProblems) 
        }
        })()
    },[allProblems])

    useEffect(()=>{
        (async()=>{
            setIsFetching(true)
            await fetchContent(topics) 
            setIsFetching(false)
 
         })()
     },[topics])

  
    useEffect(()=>{
        setIsFetching(true)
        onAuthStateChanged(auth, async (user) => {

            const metadata = user.metadata
            if(metadata.creationTime === metadata.lastSignInTime)
                return
            setIsFetching(true)
            if (user) {
              const uid = user.uid;
              //console.log("USER ", user)
                  dispatch(signInUser({userToken:uid, isSignedIn:true}))
                 
                  const res =await fetchFavorites(uid)
                 
                  if(res.length >0){
                      dispatch(updateFavorites(res))
                      await fetchContent(res)                 
                  }
                } 
                setIsFetching(false)
          });
          if(topics.length >0){
            (async()=>{
                await fetchContent(topics)
            })()
        }
        setIsFetching(false)
          checkIfUploaded(userId)
          fetchFavorites(userId)
         fetchHelpers()
    },[])    



    const openSubject = (subject)=>{
        navigation.navigate('Subject',subject)
    }

    //console.log("Is fetching", isFetching)
   
    return(
        <View style={{flex:1}}>
            <View style={{flex:1,backgroundColor:backgroundColor, paddingHorizontal:0.05*width}}>
                <HeaderComp heading={"All Problems"} handlePress={()=>setIsVisible(true)}/>
                <SearchBarComp placeholder={"...search problem"} setSearch={setSearch} search={search}/>
                <SubjectsComp openSubject={openSubject} chosenTopics={topics.length ==0 ?topics :topics.filter(item=>item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)} userId={userId}/>
                <HomeModal setIsVisible={setIsVisible} isVisible={isVisible}/>
            </View>
            <Favorite isVisible={isShown} setIsVisible={setIsShown} setIsLoading={setIsLoading} modalTopics={modalTopics}/>
            <Loader isVisible={isFetching}/>
        </View>
    )

}

export default HomeScreen