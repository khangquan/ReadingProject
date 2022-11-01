import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';
import UserScreen from '../Screens/UserScreen/UserScreen';
import BooksTypeScreen from '../Screens/BooksTypeScreen/BooksTypeScreen';
import DetailScreen from '../Screens/DetailScreen/DetailScreen';
import AllBooksScreen from '../Screens/AllBooksScreen/AllBooksScreen';
import ReadingScreen from '../Screens/ReadingScreen/ReadingScreen';
import SearchScreen from '../Screens/SearchScreen/SearchScreen';
import UserInfoScreen from '../Screens/UserScreen/UserInfoScreen';

const Tabs = createBottomTabNavigator();
const LoginStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

const LoginStackNavigator = () => (
  <LoginStack.Navigator initialRouteName='LoginScreen' screenOptions={{ headerShown: false }}>
    <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
    <LoginStack.Screen name="HomeScreen" component={HomeScreen} />
  </LoginStack.Navigator>
);

const HomeStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeScreen" component={TabsNavigator} />
    <HomeStack.Screen name="SearchScreen" component={SearchScreen} />
    <HomeStack.Screen name="AllBooksScreen" component={AllBooksScreen} />
    <HomeStack.Screen name="DetailScreen" component={DetailScreen} />
    <HomeStack.Screen name="ReadingScreen" component={ReadingScreen} />
    <HomeStack.Screen name="UserInfoScreen" component={UserInfoScreen} />
  </HomeStack.Navigator>
);

const TabsNavigator = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Trang Chủ') {
          iconName = focused ? 'home' : 'home-outline';
          size = focused ? 35 : 30;
        } else if (route.name === 'Tài Khoản') {
          iconName = focused ? 'person-circle' : 'person-circle-outline';
          size = focused ? 35 : 30;
        } else if (route.name === 'Thể Loại') {
          iconName = focused ? 'apps' : 'apps-outline';
          size = focused ? 35 : 30;
        }
        return <Icon name={iconName} size={size} color={color} />;
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
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tabs.Screen name="Trang Chủ" component={HomeScreen} />
    <Tabs.Screen name="Thể Loại" component={BooksTypeScreen} />
    <Tabs.Screen name="Tài Khoản" component={UserScreen} />
  </Tabs.Navigator>
);

export default function Navigator() {
  const { isLogin } = useSelector(state => state.loginScreen);
  return (
    <NavigationContainer>
      {
        isLogin
          ?
          <HomeStackNavigator />
          :
          <LoginStackNavigator />
      }
    </NavigationContainer>
  );
}
