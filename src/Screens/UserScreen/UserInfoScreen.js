import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { delAvatar, editAvatar } from '../../redux/actions/AccountAction'

import Icon from 'react-native-vector-icons/Ionicons'
import { IconString } from '../../utils/Icon'
import { colors } from '../../utils/Colors'
import { Avatar } from '@react-native-material/core'
import { launchImageLibrary } from 'react-native-image-picker'

import HeaderBar from '../../components/HeaderBar'
import UserInfoBox from '../../components/UserInfoBox'

export default function UserInfoScreen({ navigation }) {
  const dispatch = useDispatch()
  const { userAccounts } = useSelector(state => state.register)
  const { currentUser } = useSelector(state => state.loginScreen)
  const [userInfo, setUserInfo] = useState([])
  const [showPass, setShowPass] = useState(true)

  useEffect(() => {
    userAccounts.map(user => {
      if (user.email === currentUser) setUserInfo(user)
    })
  }, [])

  const handleEditInfo = value => {
    Alert.alert('Lưu ý!', `Bạn muốn thay đổi ${value.title.toLowerCase()}?`, [
      {
        text: 'Yes',
        onPress: () => {
          navigation.navigate('EditUserInfoScreen', value)
        },
      },
      {
        text: 'No',
        onPress: () => { },
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
        onPress: () => { },
      },
      {
        text: 'Xóa avatar',
        onPress: () => {
          dispatch(delAvatar({ id: userInfo.id }))
        },
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        title={'Thông tin tài khoản'}
        leftItem={IconString.goBack}
        onLeftEvent={() => navigation.goBack()}
      />

      <View style={styles.botContent}>
        {/* Avatar */}
        <View>
          {userInfo.avatar === null ? (
            <Avatar
              style={{ margin: 10 }}
              label={userInfo.fullname}
              autoColor={true}
              size={150}
            />
          ) : (
            <Avatar
              style={{ margin: 10 }}
              size={150}
              image={{ uri: userInfo.avatar }}
            />
          )}
          <TouchableOpacity
            onPress={handleEditAvatar}
            style={styles.editAvatar}>
            <Icon name={IconString.edit} size={25} color={colors.black} />
          </TouchableOpacity>
        </View>

        {/* Họ và Tên */}
        <UserInfoBox
          title={'Họ Tên:'}
          value={userInfo.fullname}
          onEvent={() =>
            handleEditInfo({ name: userInfo.fullname, title: 'Họ Tên' })
          }
          isPassBox={false}
        />

        {/* Email */}
        <UserInfoBox
          title={'Email:'}
          value={userInfo.email}
          onEvent={() =>
            handleEditInfo({ email: userInfo.email, title: 'Email' })
          }
          isPassBox={false}
        />

        {/* Password */}
        <UserInfoBox
          title={'Password:'}
          value={userInfo.pass}
          onEvent={() =>
            handleEditInfo({ pass: userInfo.pass, title: 'Password' })
          }
          isPassBox={true}
          onPassBoxEvent={() => setShowPass(!showPass)}
          showPass={showPass?true:false}
        />

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
})
