import {  db, setDoc, doc,
    } from '../firebase/configs'
import { signInUser } from '../redux/slices/authSlice';
import {getDetails} from './fetchDetails'
import {fetchFavorites}  from '../functions/fetchFavorites'
import { updateFavorites } from '../redux/slices/favoritesSlice'
import store from '../redux/store';
import * as SecureStore from 'expo-secure-store';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";

const auth = getAuth();

const signIn = async (email, password)=>{
    let errorMsg = null
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password) 
        
        const user = userCredential.user;
        if (user.emailVerified) {
            await SecureStore.setItemAsync('auth_details',JSON.stringify({userToken:user.uid, isSignedIn:true}));
            await getDetails()
            const favorites = await fetchFavorites(user.uid)
            store.dispatch(updateFavorites(favorites))
            //await getChosenSubjects()
            store.dispatch(signInUser({userToken:user.uid, isSignedIn:true})) 
        }else{
            await sendEmailVerification(user)
            alert("Email not verified, go to your email to verify it")
        }
        // ...
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        errorMsg=errorMessage
        
    }
    return errorMsg
}

const signUp = async (username,email, password)=>{

    let errorMsg = null
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        const date = new Date()

        await setDoc(doc(db, "account details", user.uid), {
            username,
            email,
            profilePic: null,
            userId: user.uid,
            bio:"",
            problemsSolved:0,
            problemsCreated:0,
            points:0,
            notification:true,
            timeRegistered:date.getTime()
          });

          await setDoc(doc(db, "banking details", user.uid), {
            accountHolder:'',
            accountNumber:'',
            accountType: '',
            branchCode:'',
            bankName:'',
            cellNumber:'',
            userId: user.uid,
          });


        await sendEmailVerification(user)
        alert("Email sent to "+email+" for verification")
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        errorMsg=errorMessage
    }

    return errorMsg
}

const signOutUser = async()=>{
    let errorMsg = null
    try {
        await signOut(auth)
        await SecureStore.deleteItemAsync('auth_details', {})
        await SecureStore.deleteItemAsync('account_details', {})
        await SecureStore.deleteItemAsync('chosen_subjects', {})
        await SecureStore.deleteItemAsync('theme', {})
        store.dispatch(updateFavorites([]))
        //changeTheme('light mode pink')


// delete all keys

    } catch (error) {
        const errorMessage = error.message
        errorMsg=errorMessage
    }
    return errorMsg
}

export {signUp, signIn, signOutUser}