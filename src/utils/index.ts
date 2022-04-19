// @ts-ignore
import CryptoJS from 'crypto-js'
const { NEXT_PUBLIC_SECRET_KEY } = process.env
const commonKey = 'Ubuntu_2--zsbd--_d'
export const Encrypt = (data: string) => {
	return CryptoJS.AES.encrypt(data, `${NEXT_PUBLIC_SECRET_KEY || commonKey}`).toString()
}
export const Decrypt = (data: string) => {
	return CryptoJS.AES.decrypt(data, `${NEXT_PUBLIC_SECRET_KEY || commonKey}`).toString(
		CryptoJS.enc.Utf8
	)
}
