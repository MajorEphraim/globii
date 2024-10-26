import { auth, db, doc, updateDoc,
    addDoc, collection 
   } from '../firebase/configs'

const updateProblemCase = async(caseClosed, id)=>{

const docRef = doc(db, "problems", id);
await updateDoc(docRef, {caseClosed});

}

export default updateProblemCase




