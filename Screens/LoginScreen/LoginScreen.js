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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TextBox from './TextBox';
import {appLogin} from '../../redux/actions/LoginScreenAction';
import {register} from '../../redux/actions/AccountAction';
import {Formik} from 'formik';
import {styles} from './LoginScreenStyles';
import {checkLogInValidate, checkRegValidate} from './CheckValidate';

export default function LoginScreen({navigation}) {
  const LOGIN = 'LOGIN';
  const SIGNUP = 'SIGNUP';
  const [showScreen, setShowScreen] = useState(LOGIN);
  const [secure, setSecure] = useState(true);
  const dispatch = useDispatch();
  const {userAccounts} = useSelector(state => state.register);

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
            initialValues={{email: '', pass: ''}}
            validationSchema={checkLogInValidate}
            //Handle Login Account
            onSubmit={({email, pass}) => {
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
                {LogInData.map(item => {
                  let value = item.label;
                  return (
                    <View>
                      <Text style={styles.text}>{item.title}</Text>
                      <TextBox
                        isSecure={item.pass ? secure : null}
                        title={item.title}
                        onEvent={handleShowPass}
                        isPasswordBox={item.pass ? true : false}
                        onBlur={handleBlur(value)}
                        onChangeText={handleChange(value)}
                        value={values.value}
                      />
                      {errors.value && touched.value ? (
                        <Text style={styles.errorText}>{errors.value}</Text>
                      ) : null}
                    </View>
                  );
                })}

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
              onSubmit={({fullname, email, pass, confirmPass}) => {
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
                  {RegisterData.map(item => {
                    let value = item.label;
                    return (
                      <View>
                        <Text style={styles.text}>{item.title}</Text>
                        <TextBox
                          title={item.desc}
                          isSecure={item.pass ? true : false}
                          onChangeText={handleChange(value)}
                          onBlur={handleBlur(value)}
                          value={values.value}
                        />
                        {errors.value && touched.value ? (
                          <Text style={styles.errorText}>{errors.value}</Text>
                        ) : null}
                      </View>
                    );
                  })}
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

const LogInData = [
  {
    title: 'Email',
    desc: 'Nhập địa chỉ Email của bạn',
    label: 'email',
    pass: false,
  },
  {
    title: 'Mật khẩu',
    desc: 'Nhập mật khẩu của bạn',
    label: 'pass',
    pass: true,
  },
];

const RegisterData = [
  {
    title: 'Họ & tên của bạn',
    desc: 'Nhập họ & tên của bạn',
    label: 'fullname',
    pass: false,
  },
  {
    title: 'Địa chỉ Email',
    desc: 'Nhập địa chỉ Email của bạn',
    label: 'Email',
    pass: false,
  },
  {
    title: 'Mật khẩu',
    desc: 'Nhập mật khẩu của bạn',
    label: 'pass',
    pass: true,
  },
  {
    title: 'Xác nhận mật khẩu',
    desc: 'Nhập lại mật khẩu của bạn',
    label: 'confirmPass',
    pass: true,
  },
];
