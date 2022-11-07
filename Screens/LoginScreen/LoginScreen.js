import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    ImageBackground,
} from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextBox from './TextBox'
import { appLogin } from '../../redux/actions/LoginScreenAction'
import { register } from '../../redux/actions/RegisterAction'

export default function LoginScreen({ navigation }) {
    const LOGIN = 'LOGIN'
    const SIGNUP = 'SIGNUP'
    const [showScreen, setShowScreen] = useState(LOGIN)
    const [secure, setSecure] = useState(true)
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [errorBox, setErrorBox] = useState(false)
    const dispatch = useDispatch()
    const {userAccounts} = useSelector(state => state.register)
    
    //Login Account
    const handleLogin = () => {
        if (email.length === 0 || pass.length === 0) {
            setErrorBox(true)
            alert('Please input email and password!')
        } else {
            let result = userAccounts.find(user => user.email === email && user.pass === pass)
            if (result) {
                dispatch(appLogin(result.fullname, result.email, result.pass))
            } else {
                alert('You have input wrong email or password!')
            }
        }
    }

    //Show or Hide Password
    const handleShowPass = () => {
        setSecure(!secure)
    }

    //Register
    const [fullname, setFullname] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [ErrorCreateAccBox, setErrorCreateAccBox] = useState(false)

    const handleCreateAccount = () => {
        if (fullname.length === 0 || newEmail.length === 0 || newPass.length === 0 || confirmPass.length === 0) {
            setErrorCreateAccBox(true)
            alert('Vui lòng nhập hết các thông tin của bạn!')
        } else if (newPass != confirmPass) {
            alert('Mật khẩu xác nhận không đúng!')
        } else {
            let checkDuplicate = userAccounts.find(user => user.email === newEmail)
            if(checkDuplicate){
                alert('Email này đã được sử dụng! vui lòng chọn email khác!')
            } else {
                dispatch(register(fullname, newEmail, newPass))
                alert('Đăng ký tài khoản thành công!!')
                setShowScreen(LOGIN)
            }
        }
    }

    return (
        <ImageBackground blurRadius={6} source={require('../../assets/LoginScreen/background.jpg')} style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity
                    disabled={showScreen === LOGIN ? true : false}
                    onPress={() => { setShowScreen(LOGIN) }}
                >
                    <Text style={[styles.login, showScreen == LOGIN ? {
                        borderBottomWidth: 4,
                        borderColor: '#FB7849'
                    } : null]}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={showScreen === SIGNUP ? true : false}
                    onPress={() => { setShowScreen(SIGNUP) }}
                >
                    <Text style={[styles.signup, showScreen == SIGNUP ? {
                        borderBottomWidth: 4,
                        borderColor: '#FB7849'
                    } : null]}>Signup</Text>
                </TouchableOpacity>
            </View>
            {
                showScreen == LOGIN ?
                    <KeyboardAvoidingView style={styles.inputContent}>
                        <Text style={styles.text}>Email</Text>
                        <TextBox title={'Email address'} isBlank={errorBox}
                            value={(value) => setEmail(value)}
                        />

                        <Text style={styles.text}>Password</Text>
                        <TextBox isSecure={secure} title={'Password'} isBlank={errorBox}
                            onEvent={handleShowPass} isPasswordBox={true}
                            value={(value) => setPass(value)}
                        />

                        <View style={styles.buttonContent}>
                            <TouchableOpacity style={styles.buttonLoginWrapper} onPress={handleLogin}>
                                <Text style={styles.buttonLogin}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.forgotPass}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>

                    :

                    <KeyboardAvoidingView style={styles.inputContent}>

                        <Text style={styles.text}>Full Name</Text>
                        <TextBox title={'Enter your fullname'}
                            value={value => setFullname(value)}
                            isBlank={ErrorCreateAccBox}
                        />

                        <Text style={styles.text}>Email</Text>
                        <TextBox title={'Enter your email address'}
                            value={value => setNewEmail(value)}
                            isBlank={ErrorCreateAccBox}
                        />

                        <Text style={styles.text}>Password</Text>
                        <TextBox title={'Enter your password'}
                            isSecure={true}
                            value={value => setNewPass(value)}
                            isBlank={ErrorCreateAccBox}
                        />

                        <Text style={styles.text}>Confirm Password</Text>
                        <TextBox title={'Enter your password'}
                            isSecure={true}
                            value={value => setConfirmPass(value)}
                            isBlank={ErrorCreateAccBox}
                        />

                        <View style={styles.buttonContent}>
                            <TouchableOpacity style={styles.buttonLoginWrapper} onPress={handleCreateAccount}>
                                <Text style={styles.buttonLogin}>Create Account</Text>
                            </TouchableOpacity>
                            <Text style={styles.TermsOfServices}>By creating an account you are accepting our Terms of Services</Text>
                        </View>
                    </KeyboardAvoidingView>
            }
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFE6BE'
    },
    content: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.5,
    },
    login: {
        fontSize: 25,
        fontWeight: 'bold',
        marginRight: 15,
        color: 'white',
    },
    signup: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 15,
        color: 'white'
    },
    inputContent: {
        flex: 2,
    },
    text: {
        marginLeft: 25,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    inputPassword: {
        marginHorizontal: 20,
        marginTop: 15,
        padding: 15,
        borderRadius: 15,
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: 'gray',
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowOffset: {
            height: 5,
            width: 5,
        },
        flexDirection: 'row',
        justifyContent: 'space-between',
        right: 0
    },
    buttonContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonLoginWrapper: {
        width: '90%',
        backgroundColor: '#FB7849',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 20
    },
    buttonLogin: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    forgotPass: {
        color: 'white',
        borderBottomWidth: 1,
        borderColor: 'white',
        margin: 10,
        fontSize: 15,
    },
    TermsOfServices: {
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
        width: '80%',
    },
})