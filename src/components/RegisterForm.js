import {
    View,
    Text,
    TouchableOpacity,
    Keyboard,
    Alert,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextBox from './TextBox'
import { register } from '../redux/actions/AccountAction'
import { Formik } from 'formik'
import { styles } from '../Screens/LoginScreen/LoginScreenStyles'
import { checkRegValidate } from '../Screens/LoginScreen/CheckValidate'

export default function RegisterForm(props) {
    const LOGIN = 'LOGIN'
    const dispatch = useDispatch()
    const { userAccounts } = useSelector(state => state.register)

    const sendDataToLoginScreen = () => {
        props.screen(LOGIN)
    }

    //Xử lý đăng ký tài khoản
    const handleRegister = ({ fullname, email, pass, confirmPass }) => {
        if (pass != confirmPass) {
            Alert.alert(
                'Lỗi',
                'Mật khẩu xác nhận không giống với mật khẩu!',
            )
        } else {
            let checkDuplicate = userAccounts.find(
                user => user.email === email,
            )
            if (checkDuplicate) {
                Alert.alert(
                    'Lỗi',
                    'Email này đã được sử dụng! vui lòng chọn email khác!',
                )
            } else {
                Keyboard.dismiss()
                dispatch(
                    register({
                        id: new Date().getTime(),
                        fullname: fullname,
                        email: email,
                        pass: pass,
                        avatar: null,
                        favBookData: [],
                    }),
                )
                setTimeout(() => {
                    Alert.alert('Thông báo', 'Đăng ký tài khoản thành công!!')
                    sendDataToLoginScreen()
                }, 2000)
            }
        }
    }
    return (
        <View style={styles.inputContent}>
            <KeyboardAwareScrollView
                onPress={Keyboard.dismiss}
                keyboardShouldPersistTaps="handled">
                <Formik
                    initialValues={{
                        fullname: '',
                        email: '',
                        pass: '',
                        confirmPass: '',
                    }}
                    validationSchema={checkRegValidate}
                    onSubmit={({ fullname, email, pass, confirmPass }) =>
                        handleRegister({ fullname, email, pass, confirmPass })}>
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (
                        <View>
                            <Text style={styles.text}>Họ & tên của bạn</Text>
                            <TextBox
                                title="Nhập họ & tên của bạn"
                                onChangeText={handleChange('fullname')}
                                onBlur={handleBlur('fullname')}
                                value={values.fullname}
                            />
                            {errors.fullname && touched.fullname ? (
                                <Text style={styles.errorText}>{errors.fullname}</Text>
                            ) : null}

                            <Text style={styles.text}>Email của bạn</Text>
                            <TextBox
                                title="Nhập email bạn"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            {errors.email && touched.email ? (
                                <Text style={styles.errorText}>{errors.email}</Text>
                            ) : null}

                            <Text style={styles.text}>Mật khẩu của bạn</Text>
                            <TextBox
                                title="Nhập mật khẩu của bạn"
                                isSecure={true}
                                onChangeText={handleChange('pass')}
                                onBlur={handleBlur('pass')}
                                value={values.pass}
                            />
                            {errors.pass && touched.pass ? (
                                <Text style={styles.errorText}>{errors.pass}</Text>
                            ) : null}

                            <Text style={styles.text}>Xác nhận mật khẩu của bạn</Text>
                            <TextBox
                                title="Nhập lại mật khẩu của bạn"
                                isSecure={true}
                                onChangeText={handleChange('confirmPass')}
                                onBlur={handleBlur('confirmPass')}
                                value={values.confirmPass}
                            />
                            {errors.confirmPass && touched.confirmPass ? (
                                <Text style={styles.errorText}>{errors.confirmPass}</Text>
                            ) : null}

                            <View style={styles.buttonContent}>
                                <TouchableOpacity
                                    style={styles.buttonLoginWrapper}
                                    onPress={handleSubmit}>
                                    <Text style={styles.buttonLogin}>Tạo tài khoản</Text>
                                </TouchableOpacity>
                                <Text style={styles.TermsOfServices}>
                                    Bằng cách tạo một tài khoản, bạn đồng ý với Điều khoản
                                    Dịch vụ của chúng tôi
                                </Text>
                            </View>
                        </View>
                    )}
                </Formik>
            </KeyboardAwareScrollView>
        </View>
    )
}
