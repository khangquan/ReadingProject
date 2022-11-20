import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TextBox from './TextBox';
import {appLogin} from '../../redux/actions/LoginScreenAction';
import {register} from '../../redux/actions/RegisterAction';

export default function LoginScreen({navigation}) {
  const LOGIN = 'LOGIN';
  const SIGNUP = 'SIGNUP';
  const [showScreen, setShowScreen] = useState(LOGIN);
  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errorBox, setErrorBox] = useState(false);
  const dispatch = useDispatch();
  const { userAccounts } = useSelector(state => state.register);

  //Login Account
  const handleLogin = () => {
    if (email.length === 0 || pass.length === 0) {
      setErrorBox(true);
      alert('Vui lòng nhập email và mật khẩu !');
    } else {
      let result = userAccounts.find(item => item.email === email && item.pass === pass)
      
      if (result) {
        dispatch(appLogin(result.email));
      } else {
        alert('Bạn đã nhập sai email hoặc mật khẩu !');
      }
    }
  };

  //Show or Hide Password
  const handleShowPass = () => {
    setSecure(!secure);
  };

  //Register
  const [fullname, setFullname] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [ErrorCreateAccBox, setErrorCreateAccBox] = useState(false);

  const handleCreateAccount = () => {
    if (
      fullname.length === 0 ||
      newEmail.length === 0 ||
      newPass.length === 0 ||
      confirmPass.length === 0
    ) {
      setErrorCreateAccBox(true);
      alert('Vui lòng nhập hết các thông tin của bạn!');
    } else if (newPass != confirmPass) {
      alert('Mật khẩu xác nhận không đúng!');
    } else {
      let checkDuplicate = userAccounts.find(user => user.email === newEmail);
      if (checkDuplicate) {
        alert('Email này đã được sử dụng! vui lòng chọn email khác!');
      } else {
        dispatch(register({
          id: new Date().getTime(),
          fullname: fullname, 
          email: newEmail, 
          pass: newPass
        }));
        alert('Đăng ký tài khoản thành công!!');
        setShowScreen(LOGIN);
      }
  }}

  return (
    <ImageBackground
      blurRadius={6}
      source={require('../../assets/LoginScreen/background.jpg')}
      style={styles.container}
    >
      <View style={styles.content}>
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
        <KeyboardAvoidingView style={styles.inputContent}>
          <Text style={styles.text}>Email</Text>
          <TextBox
            title={'Địa chỉ email'}
            isBlank={errorBox}
            value={value => setEmail(value)}
          />

          <Text style={styles.text}>Mật Khẩu</Text>
          <TextBox
            isSecure={secure}
            title={'Mật khẩu'}
            isBlank={errorBox}
            onEvent={handleShowPass}
            isPasswordBox={true}
            value={value => setPass(value)}
          />

          <View style={styles.buttonContent}>
            <TouchableOpacity
              style={styles.buttonLoginWrapper}
              onPress={handleLogin}
            >
              <Text style={styles.buttonLogin}>Đăng Nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotPass}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      ) : (
        //Register Form
        <View style={styles.inputContent}>
          <KeyboardAwareScrollView
            onPress={Keyboard.dismiss}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.text}>Họ & Tên</Text>
            <TextBox
              title={'Nhập họ & tên của bạn'}
              value={value => setFullname(value)}
              isBlank={ErrorCreateAccBox}
            />

            <Text style={styles.text}>Địa chỉ Email</Text>
            <TextBox
              title={'Nhập địa chỉ email của bạn'}
              value={value => setNewEmail(value)}
              isBlank={ErrorCreateAccBox}
            />

            <Text style={styles.text}>Mật khẩu</Text>
            <TextBox
              title={'Nhập mật khẩu của bạn'}
              isSecure={true}
              value={value => setNewPass(value)}
              isBlank={ErrorCreateAccBox}
            />

            <Text style={styles.text}>Xác nhận mật khẩu</Text>
            <TextBox
              title={'Nhập lại mật khẩu của bạn'}
              isSecure={true}
              value={value => setConfirmPass(value)}
              isBlank={ErrorCreateAccBox}
            />

            <View style={styles.buttonContent}>
              <TouchableOpacity
                style={styles.buttonLoginWrapper}
                onPress={handleCreateAccount}
              >
                <Text style={styles.buttonLogin}>Tạo tài khoản</Text>
              </TouchableOpacity>
              <Text style={styles.TermsOfServices}>
              Bằng cách tạo một tài khoản, bạn đồng ý với Điều khoản Dịch vụ của chúng tôi
              </Text>
            </View>
          </KeyboardAwareScrollView>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE6BE',
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
    color: 'white',
  },
  inputContent: {
    flex: 2,
  },
  text: {
    marginLeft: 25,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
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
    right: 0,
  },
  buttonContent: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLoginWrapper: {
    width: '90%',
    backgroundColor: '#FB7849',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 20,
  },
  buttonLogin: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
});
