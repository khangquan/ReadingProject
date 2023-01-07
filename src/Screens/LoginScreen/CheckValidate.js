import * as Yup from 'yup'

export const checkLogInValidate = Yup.object().shape({
  email: Yup.string()
    //.email('Email không hợp lệ')
    .required('Vui lòng nhập email của bạn!'),
  pass: Yup.string().required('Vui lòng nhập mật khẩu của bạn!'),
})

export const checkRegValidate = Yup.object().shape({
  fullname: Yup.string()
    .min(3, 'Tối thiểu 3 ký tự!')
    .max(50, 'Tối đa 50 ký tự!')
    .required('Vui lòng nhập họ tên của bạn!'),
  email: Yup.string()
    //.email('Email không hợp lệ')
    .min(3, 'Tối thiểu 3 ký tự!')
    .max(50, 'Tối đa 50 ký tự!')
    .required('Vui lòng nhập email của bạn!'),
  pass: Yup.string()
    .min(3, 'Tối thiểu 3 ký tự!')
    .max(50, 'Tối đa 50 ký tự!')
    .required('Vui lòng nhập mật khẩu của bạn!'),
  confirmPass: Yup.string()
    .min(3, 'Tối thiểu 3 ký tự!')
    .max(50, 'Tối đa 50 ký tự!')
    .required('Vui lòng nhập mật khẩu xác nhận của bạn!'),
})
