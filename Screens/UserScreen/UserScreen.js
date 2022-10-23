import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import UserMenu from './UserMenu'
import { useDispatch, useSelector } from 'react-redux'
import { appLogout } from '../../redux/actions/LoginScreenAction'

export default function UserScreen({ navigation }) {
  const dispatch = useDispatch()
  const { email } = useSelector((state) => state.loginScreen)
  const handleLogout = (item) => {
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
          onPress: () => {},
        },
      ])
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenu}>
        <View style={styles.topContent}>
          <Text style={styles.topTextStyle}>Tài Khoản</Text>
        </View>
      </View>

      <View style={styles.botContent}>
        <View style={styles.welcomeStyle}>
          <Text style={styles.welcomeText}>Chào mừng,</Text>
          <Text style={styles.accountText}>{email}</Text>
          <Icon name="person-circle-outline" size={60} />
        </View>
        <ScrollView>
          <View>
            <UserMenu
              title={'Thông tin tài khoản'}
              iconName={'person-outline'}
            />
            <UserMenu
              title={'Danh sách yêu thích'}
              iconName={'heart-outline'}
            />
          </View>

          <View>
            <Text style={styles.menuTitle}>GIỚI THIỆU/ HƯỚNG DẪN</Text>
            {INTRODUCE.map((item, index) => {
              return (
                <UserMenu
                  iconName={item.iconName}
                  title={item.title}
                />
              )
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
    title: 'Điều khoản quy định',
    iconName: 'bar-chart-outline',
  },
  {
    title: 'Góp ý',
    iconName: 'chatbubble-ellipses-outline',
  },
]

const SETTING = [
  {
    title: 'Cài đặt',
    iconName: 'settings-outline',
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
  topMenu: {
    height: '10%',
    width: '100%',
    backgroundColor: '#FB7849',
  },
  topContent: {
    justifyContent: 'center',
    width: '90%',
    height: '100%',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  topTextStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFF',
  },
  botContent: {
    flex: 2,
  },
  welcomeText: {
    fontSize: 20,
    margin: 10,
    width: '30%'
  },
  accountText: {
    fontSize: 20,
    width: '40%',
  },
  welcomeStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  menuTitle: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
})