import { Canceler } from 'axios'
export let httpRequestList: Canceler[] = []

export const clearHttpRequestingList = () => {
	if (httpRequestList.length > 0) {
		httpRequestList.forEach((item: Canceler) => {
			item()
		})
		httpRequestList = []
	}
}
