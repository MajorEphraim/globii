import { auth, db, doc, updateDoc,
    addDoc, collection, setDoc, deleteDoc 
   } from '../firebase/configs'
   
const deleteFav =async(id)=>{
    await deleteDoc(doc(db, "favorites", id));
}

const addNewFav =async(favorite, userId)=>{
    const name = favorite.name
    const newProblems = favorite.newProblems
   await addDoc(collection(db, "favorites"), {name, newProblems,userId});
}

const chooseFavorites = async(favorites, userId, prev)=>{
    try{
        const delPromises = []
        const addPromises = []

        if(favorites.length ===0){
            prev.forEach(async item=>delPromises.push(deleteFav(item.id)))
        }else{
            const addFav = favorites.filter(item=>prev.map(item_=>item_.name).includes(item.name)=== false)
            const delFav = prev.filter(item=>favorites.map(item_=>item_.name).includes(item.name)=== false)

            addFav.forEach(async item=>addPromises.push(addNewFav(item, userId)))
            delFav.forEach(async item=>delPromises.push(deleteFav(item.id)))
        }

        await Promise.all(delPromises)
        await Promise.all(addPromises)
        return
    }catch(e){
        console.log(e.message)
    }
}

export default chooseFavorites




