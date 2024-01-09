import { combineReducers } from 'redux'
import api from './loaderSlice'

const reducer = combineReducers({
    api,
})

export default reducer
