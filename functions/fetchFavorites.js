import { auth, db, doc, updateDoc,getDoc,
    addDoc, collection,query, where, onSnapshot, getDocs 
   } from '../firebase/configs'
import store from '../redux/store'
import { updateAllProblems } from '../redux/slices/problemsSlice'
import { updateAllSolutions } from '../redux/slices/solutionsSlice'
import { updateSolvers } from '../redux/slices/solversSlices'
import { updateFavorites } from '../redux/slices/favoritesSlice'
import chooseFavorites from './chooseFavorites'

const fetchDocs = async(userId)=>{

    if(userId == null)
    return []
  
    const favQuery = query(collection(db, "favorites"), where('userId', '==',userId ));
    
    const querySnapshot = await getDocs(favQuery);
   
    let fav = []
    querySnapshot.forEach((doc) => {
        fav.push({...doc.data(),...{id:doc.id}})
    });

    if(fav.length>0)
        store.dispatch(updateFavorites(fav))
    return fav   
}

const fetchFavorites = async(userId)=>{
   let arr = []
    if(userId == null)
    return arr
    const favQuery = query(collection(db, "favorites"), where('userId', '==',userId ));

    try{
        
        const unsubscribe = onSnapshot(favQuery, async (querySnapshot) => {
           
            let fav = []
            querySnapshot.forEach(async (doc) => {
                fav.push({...doc.data(),...{id:doc.id}})
            }); 
            if(fav.length>0)
                store.dispatch(updateFavorites(fav))
            
            arr = fav
     })

    }catch(e){
        console.log(e.message)
    }
    return arr 
}

export { fetchFavorites, fetchDocs}