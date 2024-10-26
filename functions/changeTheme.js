import { updateTheme } from '../redux/slices/themeSlice'
import store from '../redux/store'
import {themes} from '../constants/data'

const changeTheme = (themeText)=>{

    if(themeText == 'light mode pink'){
        store.dispatch(updateTheme(themes[1]))
        return themes[1]
    }

    if(themeText == 'light mode blue'){
        store.dispatch(updateTheme(themes[2]))
        return themes[2]
    }

    if(themeText == 'dark mode'){
        store.dispatch(updateTheme(themes[0]))
        return themes[0]
    }

    
}

export default changeTheme
