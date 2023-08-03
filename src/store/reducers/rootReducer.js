import { combineReducers } from '@reduxjs/toolkit'
import sidebarSelector from '../slicers/sidebarSelector'
import userDetails from '../slicers/userDetails'

export const rootReducer = combineReducers({
    userDetails: userDetails,
    sidebarSelector: sidebarSelector
})


export default rootReducer