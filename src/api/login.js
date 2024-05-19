import request from '@/utils/request'

export const getPicCode = () => {
  return request.get('/captcha/image')
}
export const getMsgCode = (code, key, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {

      captchaCode: code,

      captchaKey: key,

      mobile: mobile
    }
  })
}

export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      smsCode: smsCode,
      mobile: mobile,
      isParty: false,
      partyData: {}
    }
  })
}
