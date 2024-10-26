import {auth, updateProfile, db, collection,doc, setDoc, getDoc, where, query, onSnapshot, getDocs} from '../firebase/configs'
import { updateAccountDetails } from '../redux/slices/accountSlice'
import { updateBankingDetails } from '../redux/slices/bankSlice'
import store from '../redux/store'


const fetchDetails = ()=>{
        const userId = auth.currentUser.uid
        try {
          
                const accountQuery = query(collection(db, "account details"), where('userId', '==', userId))

                const unsubscribe = onSnapshot(accountQuery, (querySnapshot) => {
                   querySnapshot.forEach((doc) => {
                        store.dispatch(updateAccountDetails(doc.data()))  
                    }); 
                });
        } catch (error) {
            console.log(error.message)
        }

        return null
}

const getDetails = async()=>{
    const userId = auth.currentUser.uid
    let errorMsg = null
    try {
        const docRef = doc(db, "account details", userId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          store.dispatch(updateAccountDetails(docSnap.data()))
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
    } catch (error) {
        errorMsg = error.message
    }

    return errorMsg
}

const fetchBankingDetails = ()=>{
    const userId = auth.currentUser.uid
    try {
      
            const accountQuery = query(collection(db, "banking details"), where('userId', '==', userId))

            const unsubscribe = onSnapshot(accountQuery, (querySnapshot) => {
               querySnapshot.forEach((doc) => {
                    store.dispatch(updateBankingDetails(doc.data()))  
                }); 
            });
    } catch (error) {
        console.log(error.message)
    }

    return null
}

export {fetchDetails, getDetails, fetchBankingDetails}
