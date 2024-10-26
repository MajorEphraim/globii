import {auth,createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, sendEmailVerification, 
        updateProfile, db, collection, setDoc, doc, signOut
    } from '../firebase/configs'


const updateBankingDetails = async (userId, accountHolder,accountNumber, accountType, branchCode, bankName, cellNumber)=>{

    let errorMsg = null
    
    try {
        
          await setDoc(doc(db, "banking details", userId), {
            accountHolder,
            accountNumber,
            accountType,
            branchCode,
            bankName,
            cellNumber,
            userId
          });

       
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        errorMsg=errorMessage
    }

    return errorMsg
}

export default updateBankingDetails