import {
  View,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { appLogout } from '../../redux/actions/LoginScreenAction'
import { Avatar } from '@react-native-material/core'

import HeaderBar from '../../components/HeaderBar'
import UserMenu from '../../components/UserMenu'

export default function UserScreen({ navigation }) {
  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState([])
  const { currentUser } = useSelector(state => state.loginScreen)
  const { userAccounts } = useSelector(state => state.register)

  useEffect(() => {
    userAccounts.map(user => {
      if (user.email === currentUser) setUserInfo(user)
    })
  }, [])
  
  const handleLogout = item => {
    if (item === 'Đăng xuất') {
      Alert.alert('Lưu ý!', 'Bạn có muốn đăng xuất?', [
        {
          text: 'Yes',
          onPress: () => {
            dispatch(appLogout())
          },
        },
        {
          text: 'No',
          onPress: () => { },
        },
      ])
    } else (
      navigation.navigate("ScheduleScreen")
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar title={'Tài Khoản'} />

      <View style={styles.botContent}>
        <View style={styles.welcomeStyle}>
          <Text style={styles.welcomeText}>Chào mừng,</Text>
          <Text style={styles.accountText}>{userInfo.fullname}</Text>
          {userInfo.avatar === null ? (
            <Avatar
              autoColor={true}
              style={styles.labelAvatar}
              label={userInfo.fullname}
              size={60}
            />
          ) : (
            <Avatar
              style={styles.labelAvatar}
              image={{ uri: userInfo.avatar }}
              size={60}
            />
          )}
        </View>

        {/* Danh mục menu tài khoản */}
        <ScrollView>
          <View>
            <UserMenu
              title={'Thông tin tài khoản'}
              iconName={'person-outline'}
              onEvent={() => {
                navigation.navigate('UserInfoScreen')
              }}
            />
            <UserMenu
              title={'Danh sách yêu thích'}
              iconName={'heart-outline'}
              onEvent={() => {
                navigation.navigate('FavBooksScreen')
              }}
            />
          </View>

          <View>
            <Text style={styles.menuTitle}>GIỚI THIỆU/ HƯỚNG DẪN</Text>
            {INTRODUCE.map((item, index) => {
              return <UserMenu iconName={item.iconName} title={item.title} />
            })}
          </View>
          <View>
            <Text style={styles.menuTitle}>CÀI ĐẶT</Text>
            {SETTING.map((item, index) => {
              return (
                <UserMenu
                  iconName={item.iconName}
                  title={item.title}
                  onEvent={() => handleLogout(item.title)}
                />
              )
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const INTRODUCE = [
  {
    title: 'Giới thiệu App',
    iconName: 'book-outline',
  },
  {
    title: 'Góp ý',
    iconName: 'chatbubble-ellipses-outline',
  },
]

const SETTING = [
  {
    title: 'Hẹn giờ đọc sách',
    iconName: 'alarm-outline',
  },
  {
    title: 'Đăng xuất',
    iconName: 'log-out-outline',
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  botContent: {
    flex: 2,
  },
  welcomeText: {
    fontSize: 20,
    margin: 10,
    width: '30%',
  },
  accountText: {
    fontSize: 20,
    width: '40%',
  },
  welcomeStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  menuTitle: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  labelAvatar: {
    marginRight: 10,
    marginVertical: 5,
  },

})
