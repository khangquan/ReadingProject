import {
  View,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableOpacity
} from 'react-native'
import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { appLogout } from '../../redux/actions/LoginScreenAction'
import { Avatar } from '@react-native-material/core'
import { IconString } from '../../utils/Icon'
import { colors } from '../../utils/Colors'

import HeaderBar from '../../components/HeaderBar'
import UserMenu from '../../components/UserMenu'

export default function UserScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false)
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
    } else navigation.navigate('ScheduleScreen',userInfo)
  }

  const handleIntroduceMenu = item => {
    if (item === 'Giới thiệu App')
      navigation.navigate('AppInfo')
    else
      setModalVisible(true)
  }

  return (
      <SafeAreaView style={styles.container}>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalPosition}>
          <View style={styles.modalStyle}>
            <Text style={styles.modalTitle}>Thông Báo</Text>
            <Text style={styles.modalContent}>Mọi thắc mắc vui lòng liên hệ qua email: kedoquan@gmail.com</Text>

            <TouchableOpacity style={styles.closeModal}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalText}> OK </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

        <HeaderBar title={'Tài Khoản'} />

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
              iconName={IconString.user}
              onEvent={() => {
                navigation.navigate('UserInfoScreen')
              }}
            />
            <UserMenu
              title={'Danh sách yêu thích'}
              iconName={IconString.heart}
              onEvent={() => {
                navigation.navigate('FavBooksScreen')
              }}
            />
          </View>

          <View>
            <Text style={styles.menuTitle}>GIỚI THIỆU/ HƯỚNG DẪN</Text>
            {INTRODUCE.map((item, index) => {
              return <UserMenu iconName={item.iconName} title={item.title}
                onEvent={() => handleIntroduceMenu(item.title)} />
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
      </SafeAreaView>
     
  )
}

const INTRODUCE = [
  {
    title: 'Giới thiệu App',
    iconName: IconString.book,
  },
  {
    title: 'Góp ý',
    iconName: IconString.chatBubble,
  },
]

const SETTING = [
  {
    title: 'Hẹn giờ đọc sách',
    iconName: IconString.alarm,
  },
  {
    title: 'Đăng xuất',
    iconName: IconString.logOut
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderBottomColor: colors.lightGray,
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
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.black,
    marginBottom: 5,
  },
  modalContent: {
    fontSize: 18,
    color: colors.black,
    textAlign: 'center',
  },
  modalPosition: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blackTrans,
  },
  modalStyle: {
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  closeModal: {
    marginTop: 10,
    borderRadius: 50,
  },
  closeModalText: {
    color: colors.primaryOrange,
    fontSize: 20,
    fontWeight: 'bold',
  },

})
