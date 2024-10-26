import { auth, db, doc, updateDoc,
        addDoc, collection 
       } from '../firebase/configs'
import uploadFile from './uploadFile';

const uploadProblem = async(heading, description, subject, pics, creator)=>{

    const promises = []
    const date = new Date()
    const dateCreated = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    pics.forEach(async pic => {
        promises.push(uploadFile(pic.uri,pic.name,'problems'))
    });

    const picsUris = await Promise.all(promises)

    const docRef = await addDoc(collection(db, "problems"), {
        heading,
        description,
        subject,
        pics:picsUris,
        caseClosed:false,
        views:[],
        dateCreated,
        totalSolutions:0,
        creator
      });

      return docRef.id
}

export default uploadProblem
