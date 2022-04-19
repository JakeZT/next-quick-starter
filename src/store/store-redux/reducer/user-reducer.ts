import { combineReducers } from 'redux'
import { userInitialState } from '../state/index'
import { actionTypes } from '../actions/index'

export const userActionType = {
	UPDATE_COUNT: 'UPDATE_COUNT',
	RESET_COUNT: 'RESET_COUNT',
}

const userState = (state: typeof userInitialState = userInitialState, action: actionTypes) => {
	// const count = state.count
	switch (action.type) {
		case userActionType.UPDATE_COUNT: {
			return { ...state, count: action.data }
		}
		case userActionType.RESET_COUNT: {
			return { ...state, count: action.data }
		}
		default:
			return state
	}
}
export default userState
