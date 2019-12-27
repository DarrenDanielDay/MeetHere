export namespace validators {
    const mobileRex = new RegExp('^(\\+\\d{2})?\\d{11}$')
    const telephoneRex = new RegExp('^(\\d{3,4})?\\d{8}$')
    const emailRex = new RegExp('^\\w+@(\\w)+(\\.(\\w)+)+$')

    export function usernameValidator(username: string) {
        if (username === '') {
          return '请输入用户名'
        } else {
          let firstchar = username[0]
          if (!Number.isNaN(Number.parseInt(firstchar))) {
            return '用户名不可以数字开头'
          } else {
            return ''
          }
        }
      }
    export function passwordValidator(password: string) {
        if (password === '') {
          return '请输入密码'
        } else if (password.length < 6) {
          return '密码至少6位'
        } else {
          return ''
        }
    }
    export function  mobilephoneValidator(mobilePhone: string) {
        if (mobilePhone === '') {
          return '请输入手机号'
        } else if (!mobileRex.test(mobilePhone)) {
          return '手机号格式不正确'
        } else {
          return ''
        }
    }
    export function telephoneValidator(telephone: string) {
        if (telephone === '') {
          return '请输入固定电话'
        } else if (!telephoneRex.test(telephone)) {
          return '固定电话的格式不正确'
        } else {
          return ''
        }
    }
    export function  emailValidator(email: string) {
        if (email === '') {
          return '请输入邮箱'
        } else if (!emailRex.test(email)) {
          return '邮箱格式不正确'
        } else {
          return ''
        }
      }
}
