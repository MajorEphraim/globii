import { auth, db, doc, deleteDoc,
    addDoc, collection 
   } from '../firebase/configs'

const deleteProblem = async(id)=>{
   
    try{
        await deleteDoc(doc(db, "problems", id));
    }
    catch(e){
        console.log(e.message)
    }
}

export default deleteProblem




