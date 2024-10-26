import { auth, db, doc, updateDoc } from '../firebase/configs'

const updateDetails = async(obj)=>{
    let errorMsg = null

    try {
        const uid = auth.currentUser.uid
        const accountRef = doc(db, "account details", uid);
        await updateDoc(accountRef, obj);
    } catch (error) {
        errorMsg = error.message
    }

    return errorMsg
}

export default updateDetails

