import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../src/defines/Colors'
import {Avatar} from '@react-native-material/core'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import {delAvatar, editAvatar} from '../../redux/actions/AccountAction'

export default function UserInfoScreen({navigation}) {
  const dispatch = useDispatch()
  const {userAccounts} = useSelector(state => state.register)
  const {currentUser} = useSelector(state => state.loginScreen)
  const [userInfo, setUserInfo] = useState([])
  const [showPass, setShowPass] = useState(true)

  useEffect(() => {
    getCurrentUser()
  }, [])

  const getCurrentUser = () => {
    userAccounts.map(user => {
      if (user.email === currentUser) setUserInfo(user)
    })
  }

  const handleEditInfo = value => {
    Alert.alert('Lưu ý!', `Bạn muốn thay đổi ${value.title.toLowerCase()}?`, [
      {
        text: 'Yes',
        onPress: () => {
          navigation.navigate('EditUserInfo', value)
        },
      },
      {
        text: 'No',
        onPress: () => {},
      },
    ])
  }

  const handleEditAvatar = () => {
    Alert.alert('Thông báo', 'Bạn muốn thay đổi avatar?', [
      {
        text: 'Yes',
        onPress: () => {
          let options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
          }
          launchImageLibrary(options, response => {
            console.log('Response = ', response)

            if (response.didCancel) {
              return
            } else if (response.errorCode == 'permission') {
              alert('Permission not satisfied')
              return
            } else if (response.errorCode == 'others') {
              alert(response.errorMessage)
              return
            }
            dispatch(
              editAvatar({
                id: userInfo.id,
                avatar: response.assets[0].uri,
              }),
            )
          })
        },
      },
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Xóa avatar',
        onPress: () => {
          dispatch(delAvatar({id: userInfo.id}))
        },
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenu}>
        <View style={styles.topContent}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}>
            <Icon name="chevron-back-outline" size={35} color={'white'} />
          </TouchableOpacity>
          <Text style={styles.topTextStyle}>Thông tin tài khoản</Text>
        </View>
      </View>

      <View style={styles.botContent}>
        <View>
          {userInfo.avatar === null ? (
            <Avatar
              style={{margin: 10}}
              label={userInfo.fullname}
              autoColor={true}
              size={150}
            />
          ) : (
            <Avatar
              style={{margin: 10}}
              size={150}
              image={{uri: userInfo.avatar}}
            />
          )}

          <TouchableOpacity
            onPress={handleEditAvatar}
            style={styles.editAvatar}>
            <Icon name="create" size={25} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>Họ Tên: </Text>
          <View style={styles.textBoxAndEdit}>
            <TextInput
              style={styles.textBoxStyle}
              value={userInfo.fullname}
              editable={false}
            />
            <TouchableOpacity
              onPress={() =>
                handleEditInfo({name: userInfo.fullname, title: 'Họ Tên'})
              }>
              <Icon name="create" size={25} color={'black'} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>Email: </Text>
          <View style={styles.textBoxAndEdit}>
            <TextInput
              style={styles.textBoxStyle}
              value={userInfo.email}
              editable={false}
            />
            <TouchableOpacity
              onPress={() =>
                handleEditInfo({email: userInfo.email, title: 'Email'})
              }>
              <Icon name="create" size={25} color={'black'} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>Password: </Text>
          <View style={styles.textBoxAndEdit}>
            <TextInput
              style={styles.textBoxStyle}
              value={userInfo.pass}
              editable={false}
              secureTextEntry={showPass ? true : false}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              {showPass ? (
                <Icon name="eye" size={25} color={'black'} />
              ) : (
                <Icon name="eye-off" size={25} color={'black'} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                handleEditInfo({pass: userInfo.pass, title: 'Password'})
              }>
              <Icon name="create" size={25} color={'black'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topMenu: {
    height: '10%',
    width: '100%',
    backgroundColor: colors.primaryOrange,
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    height: '100%',
    alignItems: 'center',
  },
  topTextStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  botContent: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editAvatar: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: '95%',
  },
  userInfoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  textBoxAndEdit: {
    backgroundColor: 'white',
    width: '70%',
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  textBoxStyle: {
    width: '80%',
    fontSize: 20,
    color: 'black',
  },
})
