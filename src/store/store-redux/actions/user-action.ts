import { userActionType } from '../reducer/user-reducer'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { userInitialState } from '../state'
export const resetCount = () => {
	return async (dispatch: any) => {
		const res = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(true)
			}, 1000)
		})
		if (!res) {
			return
		}
		// ToastSuccess('Company info successfully updated!')
		return dispatch({
			type: userActionType.RESET_COUNT,
			data: 0,
		})
	}
}
export const updateCount = (
	data: number
): ThunkAction<void, typeof userInitialState, unknown, AnyAction> => {
	return async (dispatch) => {
		return dispatch({
			type: userActionType.UPDATE_COUNT,
			data: data,
		})
	}
}
