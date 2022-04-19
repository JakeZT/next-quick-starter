import { combineReducers } from 'redux'
import userState from './user-reducer'
export const AllReducers = {
	userState,
}
export default combineReducers(AllReducers)
