import React, { useState, useEffect } from 'react';
//import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import ChooseScreen from '../screens/ChooseScreen'
import SplashScreen from '../screens/SplashScreen';
import SubjectScreen from '../screens/SubjectScreen';
import AddProblemScreen from '../screens/AddProblemScreen';
import UpdateProblemScreen from '../screens/UpdateProblemScreen';
import AddSolutionScreen from '../screens/AddSolutionScreen';
import SolutionsScreen from '../screens/SolutionsScreen';
import AccountScreen from '../screens/AccountScreen';
import MyProblemsScreen from '../screens/MyProblems';
import RatingsScreen from '../screens/RatingsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ViewProblemScreen from '../screens/ViewProblemScreen';
import AuthScreen from '../screens/AuthScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SupportScreen from '../screens/SupportScreen';

//import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux';
import { updateIsAgreed, updateIsChosen } from '../redux/slices/firstTimeSlice';
import { signInUser } from '../redux/slices/authSlice';
import { updateAccountDetails } from '../redux/slices/accountSlice';
import { updateTheme } from '../redux/slices/themeSlice'
import { auth, onAuthStateChanged } from '../firebase/configs'
import { getDetails } from '../functions/fetchDetails'
import {fetchContent} from '../functions/fetchContent';

import * as SecureStore from 'expo-secure-store';

const Stack = createStackNavigator();

export default function Navigator() {
  const isAgreed = useSelector(state=>state.firstTimeState.isAgreed)
  const isChosen = useSelector(state=>state.firstTimeState.isChosen)
  const userToken = useSelector(state=>state.authState.userToken)

  const [isRunning, setIsRunning] = useState(true)

  const dispatch = useDispatch()

  const checkFirstTime = async()=>{
    try {
        const isAgreed = await SecureStore.getItemAsync('agreed')
        const isChosen = await SecureStore.getItemAsync('chosen')
        const authDetails =  JSON.parse(await SecureStore.getItemAsync('auth_details'))
        const accountDetails = JSON.parse(await SecureStore.getItemAsync('account_details'))
        const chosenSubjects =  JSON.parse(await SecureStore.getItemAsync('chosen_subjects'))
        const theme =  JSON.parse(await SecureStore.getItemAsync('theme'))
        
        onAuthStateChanged(auth, (user) => {
          const metadata = user.metadata
          if(metadata.creationTime === metadata.lastSignInTime)
              return
          if (user) {
            const uid = user.uid;
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
             // if(user.emailVerified){
                dispatch(signInUser({userToken:uid, isSignedIn:true}))
                getDetails()
                console.log("user ", uid)
              //}
            // ...
          } else {
            // User is signed out
            // ...
            dispatch(signInUser({userToken:null, isSignedIn:false}))
            console.log("user is signed out or not connected")
          }
        });
        

        if (chosenSubjects !== null && chosenSubjects.length>0) {
          fetchContent(chosenSubjects)
        }
        
        if(isAgreed === 'true'){
          dispatch(updateIsAgreed('true'))
        }
        
        if(isChosen === 'true'){
          dispatch(updateIsChosen('true'))
        }


        if (theme !== null) {
          dispatch(updateTheme(theme))
        }


        
        
        if (authDetails !== null && authDetails !== undefined ) {
          dispatch(signInUser({userToken:authDetails.userToken, isSignedIn:authDetails.isSignedIn}))
        } else {
          dispatch(signInUser({userToken:null, isSignedIn:false}))
        }
        
        if (accountDetails !== null && accountDetails !== undefined) {
          dispatch(updateAccountDetails(accountDetails))
        }
        setIsRunning(false)
    } catch (error) {
        console.log(error.message)
    }
}

  useEffect(()=>{
    checkFirstTime()
  },[])

  if(isRunning){
    return <SplashScreen/>
  }

  return (
    <NavigationContainer>
        {
            isAgreed == 'true' && isChosen == 'true'?(
                <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}} >
                    <Stack.Screen name='Home' component={HomeScreen}/>
                    <Stack.Screen name='Subject' component={userToken == null ? AuthScreen : SubjectScreen}/>
                    <Stack.Screen name='Add problem' component={userToken == null ? AuthScreen : AddProblemScreen}/>
                    <Stack.Screen name='Update problem' component={userToken == null ? AuthScreen : UpdateProblemScreen}/>
                    <Stack.Screen name='Solutions' component={SolutionsScreen}/>
                    <Stack.Screen name='Add solution' component={userToken == null ? AuthScreen : AddSolutionScreen}/>
                    <Stack.Screen name='View problem' component={ViewProblemScreen}/>
                    <Stack.Screen name='My problems' component={userToken == null ? AuthScreen : MyProblemsScreen}/>
                    <Stack.Screen name='Account' component={userToken == null ? AuthScreen : AccountScreen}/>
                    <Stack.Screen name='Ratings' component={RatingsScreen}/>
                    <Stack.Screen name='Settings' component={SettingsScreen}/>
                    <Stack.Screen name='Profile' component={ProfileScreen}/>
                    <Stack.Screen name='Support' component={SupportScreen}/>
                </Stack.Navigator>

             ):(
                <Stack.Navigator initialRouteName={isAgreed == 'true'?'Choose':'Welcome'} screenOptions={{headerShown:false}}>
                    <Stack.Screen name='Welcome' component={WelcomeScreen}/>
                    <Stack.Screen name='Choose' component={ChooseScreen}/>
                </Stack.Navigator>
            )
        }
    </NavigationContainer>
  );
}