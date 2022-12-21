import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Keyboard,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextBox from './TextBox';
import { appLogin } from '../../redux/actions/LoginScreenAction';
import { register } from '../../redux/actions/AccountAction';
import { Formik } from 'formik';
import { styles } from './LoginScreenStyles';
import { checkLogInValidate, checkRegValidate } from './CheckValidate';

export default function LoginScreen({ navigation }) {
  const LOGIN = 'LOGIN';
  const SIGNUP = 'SIGNUP';
  const [showScreen, setShowScreen] = useState(LOGIN);
  const [secure, setSecure] = useState(true);
  const dispatch = useDispatch();
  const { userAccounts } = useSelector(state => state.register);

  //Show or Hide Password
  const handleShowPass = () => {
    setSecure(!secure);
  };

  return (
    <ImageBackground
      blurRadius={6}
      source={require('../../assets/LoginScreen/background.jpg')}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Show Login Form */}
        <TouchableOpacity
          disabled={showScreen === LOGIN ? true : false}
          onPress={() => {
            setShowScreen(LOGIN);
          }}
        >
          <Text
            style={[
              styles.login,
              showScreen == LOGIN
                ? {
                  borderBottomWidth: 4,
                  borderColor: '#FB7849',
                }
                : null,
            ]}
          >
            Đăng Nhập
          </Text>
        </TouchableOpacity>
        {/* Show Sign Up Form */}
        <TouchableOpacity
          disabled={showScreen === SIGNUP ? true : false}
          onPress={() => {
            setShowScreen(SIGNUP);
          }}
        >
          <Text
            style={[
              styles.signup,
              showScreen == SIGNUP
                ? {
                  borderBottomWidth: 4,
                  borderColor: '#FB7849',
                }
                : null,
            ]}
          >
            Đăng Ký
          </Text>
        </TouchableOpacity>
      </View>
      {showScreen == LOGIN ? (
        //Login Form
        <KeyboardAvoidingView
          style={styles.inputContent}
          onPress={Keyboard.dismiss}
          keyboardShouldPersistTaps="handled"
        >
          <Formik
            initialValues={{ email: '', pass: '' }}
            validationSchema={checkLogInValidate}
            //Handle Login Account
            onSubmit={({ email, pass }) => {
              let result = userAccounts.find(
                item => item.email === email && item.pass === pass,
              );
              if (result) {
                dispatch(appLogin(result.email));
              } else {
                Alert.alert('Lỗi', 'Bạn đã nhập sai email hoặc mật khẩu !');
              }
            }}
          >
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
                  title='Nhập email của bạn'
                  onEvent={handleShowPass}
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}

                <Text style={styles.text}>Mật khẩu</Text>
                <TextBox
                  isSecure={secure}
                  title='Nhập mật khẩu'
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
                  <TouchableOpacity>
                    <Text style={styles.forgotPass}>Quên mật khẩu?</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      ) : (
        //Register Form
        <View style={styles.inputContent}>
          <KeyboardAwareScrollView
            onPress={Keyboard.dismiss}
            keyboardShouldPersistTaps="handled"
          >
            <Formik
              initialValues={{
                fullname: '',
                email: '',
                pass: '',
                confirmPass: '',
              }}
              validationSchema={checkRegValidate}
              onSubmit={({ fullname, email, pass, confirmPass }) => {
                if (pass != confirmPass) {
                  Alert.alert(
                    'Lỗi',
                    'Mật khẩu xác nhận không giống với mật khẩu!',
                  );
                } else {
                  let checkDuplicate = userAccounts.find(
                    user => user.email === email,
                  );
                  if (checkDuplicate) {
                    Alert.alert(
                      'Lỗi',
                      'Email này đã được sử dụng! vui lòng chọn email khác!',
                    );
                  } else {
                    dispatch(
                      register({
                        id: new Date().getTime(),
                        fullname: fullname,
                        email: email,
                        pass: pass,
                        avatar: null,
                        favBookData: [],
                      }),
                    );
                    Alert.alert('Thông báo', 'Đăng ký tài khoản thành công!!');
                    setShowScreen(LOGIN);
                  }
                }
              }}
            >
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
                    //isSecure={item.pass ? true : false}
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
                    //isSecure={item.pass ? true : false}
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
                      onPress={handleSubmit}
                    >
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
      )}
    </ImageBackground>
  );
}
