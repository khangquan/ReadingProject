import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    Alert,
} from 'react-native'
import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextBox from './TextBox'
import { appLogin } from '../redux/actions/LoginScreenAction'
import { Formik } from 'formik'
import { styles } from '../Screens/LoginScreen/LoginScreenStyles'
import { checkLogInValidate } from '../Screens/LoginScreen/CheckValidate'

export default function LoginForm(props) {
    const dispatch = useDispatch()
    const { userAccounts } = useSelector(state => state.register)
    const [secure, setSecure] = useState(true)

    const inputPass = useRef()

    //Ẩn hoặc hiện mật khẩu
    const handleShowPass = () => {
        setSecure(!secure)
    }

    //Quên Mật Khẩu
    const handleForgetPass = () => {
        props.screen('ForgotPassScreen')
    }

    //Xử lý đăng nhập tài khoản
    const handleLogin = ({ email, pass }) => {
        let result = userAccounts.find(
            item => item.email === email && item.pass === pass,
        )
        if (result) {
            Keyboard.dismiss()
            dispatch(appLogin(email))
        } else {
            Alert.alert('Lỗi', 'Bạn đã nhập sai email hoặc mật khẩu !')
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.inputContent}
            onPress={Keyboard.dismiss}
            keyboardShouldPersistTaps="handled">
            <Formik
                initialValues={{ email: '', pass: '' }}
                validationSchema={checkLogInValidate}
                onSubmit={({ email, pass }) => handleLogin({ email, pass })}>
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                }) => (
                    <View>
                        <Text style={styles.text}>Email</Text>
                        <TextBox
                            title="Nhập email của bạn"
                            onEvent={handleShowPass}
                            onBlur={handleBlur('email')}
                            onChangeText={handleChange('email')}
                            value={values.email}
                            onFocus={() => inputPass?.current.focus()}
                        />
                        {errors.email && touched.email ? (
                            <Text style={styles.errorText}>{errors.email}</Text>
                        ) : null}

                        <Text style={styles.text}>Mật khẩu</Text>
                        <TextBox
                            isSecure={secure}
                            title="Nhập mật khẩu"
                            refName={inputPass}
                            onEvent={handleShowPass}
                            isPasswordBox={true}
                            onBlur={handleBlur('pass')}
                            onChangeText={handleChange('pass')}
                            value={values.pass}
                        />
                        {errors.pass && touched.pass ? (
                            <Text style={styles.errorText}>{errors.pass}</Text>
                        ) : null}

                        <View style={styles.buttonContent}>

                            <TouchableOpacity
                                style={styles.buttonLoginWrapper}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.buttonLogin}>Đăng Nhập</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleForgetPass}>
                                <Text style={styles.forgotPass}>Quên mật khẩu?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </KeyboardAvoidingView>
    )
}