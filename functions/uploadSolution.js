import { auth, db, doc, updateDoc,
        addDoc, collection, increment 
       } from '../firebase/configs'
import uploadFile from './uploadFile';

const uploadSolution = async(description, pics, solverId,problemId)=>{
    
    const promises = []

    pics.forEach(async pic => {
        promises.push(uploadFile(pic.uri,pic.name,'solutions'))
    });

    const picsUris = await Promise.all(promises)

    const docRef = await addDoc(collection(db, "solutions"), {
        description,
        pics:picsUris,
        solverId,
        approves:[],
        disapproves:[],
        state:'solve',
        problemId,
        views:[],
        lastComment:null,
        totalComments:0
      });

        const problemRef = doc(db, "problems", problemId);

        // Set the "capital" field of the city 'DC'
        await updateDoc(problemRef, {
            totalSolutions: increment(1)
        });
      
}

export default uploadSolution
