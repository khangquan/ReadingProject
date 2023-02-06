import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { styles } from './LoginScreenStyles'
import RegisterForm from '../../components/RegisterForm'
import LoginForm from '../../components/LoginForm'
import Loading from '../../components/Loading'

export default function LoginScreen({ navigation }) {
  const LOGIN = 'LOGIN'
  const SIGNUP = 'SIGNUP'
  const [showScreen, setShowScreen] = useState(LOGIN)
  const { isLogging } = useSelector(state => state.loginScreen)
  const { isRegistering } = useSelector(state => state.register)

  //Chuyển sang màn hình quên mật khẩu
  const handleForgetPass = (screen) => {
    navigation.navigate(screen)
  }

  //Chuyển sang form Đăng nhập
  const getScreen = (screen) => {
    setShowScreen(screen)
  }

  return (
    <>
      <ImageBackground
        blurRadius={6}
        source={require('../../../assets/LoginScreen/background.jpg')}
        style={styles.container}>
        <View style={styles.titleContent}>
          {/* Hiển thị form đăng nhập */}
          <TouchableOpacity
            disabled={showScreen === LOGIN ? true : false}
            onPress={() => setShowScreen(LOGIN)}>
            <Text
              style={[
                styles.login,
                showScreen == LOGIN ? styles.underlineTitle : null,
              ]}>
              Đăng Nhập
            </Text>
          </TouchableOpacity>

          {/* Hiển thị form đăng ký */}
          <TouchableOpacity
            disabled={showScreen === SIGNUP ? true : false}
            onPress={() => setShowScreen(SIGNUP)}>
            <Text
              style={[
                styles.signup,
                showScreen == SIGNUP ? styles.underlineTitle : null,
              ]}>
              Đăng Ký
            </Text>
          </TouchableOpacity>
        </View>

        {
          showScreen == LOGIN ?
            <LoginForm screen={handleForgetPass} />
            :
            <RegisterForm screen={getScreen} />
        }

      </ImageBackground>

      {isLogging ? <Loading /> : null}
      {isRegistering ? <Loading /> : null}
    </>
  )
}
