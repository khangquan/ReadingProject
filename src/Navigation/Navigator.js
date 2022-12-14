import {useSelector} from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'

import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

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

const Tabs = createBottomTabNavigator()
const LoginStack = createNativeStackNavigator()
const HomeStack = createNativeStackNavigator()

const LoginStackNavigator = () => (
  <LoginStack.Navigator screenOptions={{headerShown: false}}>
    <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
    <LoginStack.Screen name="ForgotPassScreen" component={ForgotPassScreen} />
    <LoginStack.Screen name="ConfirmScreen" component={ConfirmScreen} />
    <LoginStack.Screen name="CreateNewPassScreen" component={CreateNewPassScreen} />
  </LoginStack.Navigator>
)

const HomeStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{headerShown: false}}>
    <HomeStack.Screen name="HomeScreen" component={TabsNavigator} />
    <HomeStack.Screen name="SearchScreen" component={SearchScreen} />
    <HomeStack.Screen name="AllBooksScreen" component={AllBooksScreen} />
    <HomeStack.Screen name="DetailScreen" component={DetailScreen} />
    <HomeStack.Screen name="ReadingScreen" component={ReadingScreen} />
    <HomeStack.Screen name="UserInfoScreen" component={UserInfoScreen} />
    <HomeStack.Screen name="EditUserInfoScreen" component={EditUserInfoScreen} />
    <HomeStack.Screen name="FavBooksScreen" component={FavBooksScreen} />
  </HomeStack.Navigator>
)

const TabsNavigator = () => (
  <Tabs.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName
        if (route.name === 'Trang Ch???') {
          iconName = focused ? 'home' : 'home-outline'
          size = focused ? 35 : 30
        } else if (route.name === 'T??i Kho???n') {
          iconName = focused ? 'person-circle' : 'person-circle-outline'
          size = focused ? 35 : 30
        } else if (route.name === 'Th??? Lo???i') {
          iconName = focused ? 'apps' : 'apps-outline'
          size = focused ? 35 : 30
        }
        return <Icon name={iconName} size={size} color={color} />
      },
      tabBarLabelStyle: {
        fontSize: 14,
      },
      tabBarStyle: {
        height: '10%',
        backgroundColor: '#FB7849',
      },
      headerShown: false,
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'lightgray',
    })}>
    <Tabs.Screen name="Trang Ch???" component={HomeScreen} />
    <Tabs.Screen name="Th??? Lo???i" component={BooksTypeScreen} />
    <Tabs.Screen name="T??i Kho???n" component={UserScreen} />
  </Tabs.Navigator>
)

export default function Navigator() {
  const {isLogin} = useSelector(state => state.loginScreen)
  return (
    <NavigationContainer>
      {isLogin ? <HomeStackNavigator /> : <LoginStackNavigator />}
    </NavigationContainer>
  )
}
