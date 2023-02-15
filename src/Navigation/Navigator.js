import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { IconString } from '../utils/Icon'
import { colors } from '../utils/Colors'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from '../Screens/HomeScreen/HomeScreen'
import LoginScreen from '../Screens/LoginScreen/LoginScreen'
import UserScreen from '../Screens/UserScreen/UserScreen'
import BooksTypeScreen from '../Screens/BooksTypeScreen/BooksTypeScreen'
import DetailScreen from '../Screens/DetailScreen/DetailScreen'
import AllBooksScreen from '../Screens/AllBooksScreen/AllBooksScreen'
import ReadingScreen from '../Screens/ReadingScreen/ReadingScreen'
import SearchScreen from '../Screens/SearchScreen/SearchScreen'
import UserInfoScreen from '../Screens/UserScreen/UserInfoScreen'
import EditUserInfoScreen from '../Screens/UserScreen/EditUserInfoScreen'
import FavBooksScreen from '../Screens/FavoriteBooksScreen/FavBooksScreen'
import ForgotPassScreen from '../Screens/ForgotPassScreen/ForgotPassScreen'
import ConfirmScreen from '../Screens/ForgotPassScreen/ConfirmScreen'
import CreateNewPassScreen from '../Screens/ForgotPassScreen/CreateNewPassScreen'
import ScheduleScreen from '../Screens/ScheduleScreen/ScheduleScreen'
import AppInfo from '../Screens/AppInfoScreen/AppInfo'

const Tabs = createBottomTabNavigator()
const LoginStack = createNativeStackNavigator()
const HomeStack = createNativeStackNavigator()
const DetailStack = createNativeStackNavigator()

const LoginStackNavigator = () => (
  <LoginStack.Navigator screenOptions={{ headerShown: false }}>
    <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
    <LoginStack.Screen name="ForgotPassScreen" component={ForgotPassScreen} />
    <LoginStack.Screen name="ConfirmScreen" component={ConfirmScreen} />
    <LoginStack.Screen name="CreateNewPassScreen" component={CreateNewPassScreen} />
  </LoginStack.Navigator>
)

const HomeStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeScreen" component={TabsNavigator} />
    <HomeStack.Screen name="SearchScreen" component={SearchScreen} />
    <HomeStack.Screen name="AllBooksScreen" component={AllBooksScreen} />
    <HomeStack.Screen name='DetailScreen' component={DetailStackNavigator} />
    <HomeStack.Screen name="ReadingScreen" component={ReadingScreen} />
    <HomeStack.Screen name="UserInfoScreen" component={UserInfoScreen} />
    <HomeStack.Screen name="EditUserInfoScreen" component={EditUserInfoScreen} />
    <HomeStack.Screen name="FavBooksScreen" component={FavBooksScreen} />
    <HomeStack.Screen name="ScheduleScreen" component={ScheduleScreen} />
    <HomeStack.Screen name="AppInfo" component={AppInfo} />
  </HomeStack.Navigator>
)

const DetailStackNavigator = () => (
  <DetailStack.Navigator screenOptions={{ headerShown: false }}>
    <DetailStack.Screen name='DetailScreen' component={DetailScreen} />
    <DetailStack.Screen name='AllBooksScreen' component={AllBooksScreen} />
  </DetailStack.Navigator>
)

const TabsNavigator = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName
        if (route.name === 'Trang Chủ') {
          iconName = focused ? IconString.homeFill : IconString.homeOutline
          size = focused ? 35 : 30
        } else if (route.name === 'Tài Khoản') {
          iconName = focused ? IconString.userCircleFill : IconString.userCircleOutline
          size = focused ? 35 : 30
        } else if (route.name === 'Thể Loại') {
          iconName = focused ? IconString.categoryFill : IconString.categoryOutline
          size = focused ? 35 : 30
        }
        return <Icon name={iconName} size={size} color={color} />
      },
      tabBarLabelStyle: {
        fontSize: 14,
      },
      tabBarStyle: {
        height: '10%',
        backgroundColor: colors.primaryOrange,
      },
      headerShown: false,
      tabBarActiveTintColor: colors.white,
      tabBarInactiveTintColor: colors.lightGray,
    })}>
    <Tabs.Screen name="Trang Chủ" component={HomeScreen} />
    <Tabs.Screen name="Thể Loại" component={BooksTypeScreen} />
    <Tabs.Screen name="Tài Khoản" component={UserScreen} />
  </Tabs.Navigator>
)

export default function Navigator() {
  const { isLogin } = useSelector(state => state.loginScreen)
  return (
    <NavigationContainer>
      {isLogin ? <HomeStackNavigator /> : <LoginStackNavigator />}
    </NavigationContainer>
  )
}
