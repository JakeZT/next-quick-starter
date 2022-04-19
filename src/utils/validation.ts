import validator from 'validator'

export const CityValidation = (rule: any, value: string) => {
	if (!value || value.trim().length === 0) return Promise.reject('City is required')
	if (value.trim().length === 0) return Promise.reject('City required.')
	if (value.length >= 1 && value.length <= 30) {
		const rules = new RegExp(/^[a-zA-Z -']*$/, 'ig')
		const res = rules.test(value)
		if (res) {
			return Promise.resolve()
		} else {
			return Promise.reject(`City just support letters, space and slash.`)
		}
	}
	return Promise.reject('City max to 30 characters')
}

export const EmailValidation = (rule: any, value: string) => {
	if (!value || value.trim().length === 0) return Promise.reject('Email required.')
	const valid = validator.isEmail(value)
	if (valid) {
		return Promise.resolve()
	} else {
		return Promise.reject(`Email not valid. Example: example@gmail.com`)
	}
}
/* 
	<Form.Item
    style={InputCss}
    name='email'
    rules={[{ validator: EmailValidationNotRequired }]}	>
    <Input
      style={SubInputCss}
      onChange={(e) => updateInfo([{ tag: 'email', val: e.target.value }])}
      value={bookingForm.cusInfo.email}
      placeholder='Email'>
    </Input>
  </Form.Item>

*/
