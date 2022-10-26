import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';
import UserScreen from '../Screens/UserScreen/UserScreen';
import BooksTypeScreen from '../Screens/BooksTypeScreen/BooksTypeScreen';
import DetailScreen from '../Screens/DetailScreen/DetailScreen';
import AllBooksScreen from '../Screens/AllBooksScreen/AllBooksScreen';
import ReadingScreen from '../Screens/ReadingScreen/ReadingScreen';
import SearchScreen from '../Screens/SearchScreen/SearchScreen';

const Tabs = createBottomTabNavigator();
const LoginStack = createNativeStackNavigator();
const DetailStack = createNativeStackNavigator();
const AllBookStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();

const LoginStackNavigator = () => (
  <LoginStack.Navigator screenOptions={{headerShown: false}}>
    <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
    <LoginStack.Screen name="HomeScreen" component={HomeScreen} />
  </LoginStack.Navigator>
);

const DetailStackNavigator = () => (
  <DetailStack.Navigator screenOptions={{headerShown: false}}>
    <DetailStack.Screen name="HomeScreen" component={SearchStackNavigator} />
    <DetailStack.Screen name="SearchScreen" component={SearchScreen} />
    <DetailStack.Screen name="AllBooksScreen" component={AllBooksScreen} />
    <DetailStack.Screen name="DetailScreen" component={DetailScreen} />
    <DetailStack.Screen name="ReadingScreen" component={ReadingScreen} />
  </DetailStack.Navigator>
);

const SearchStackNavigator = () => (
  <SearchStack.Navigator screenOptions={{headerShown: false}}>
    <SearchStack.Screen name="HomeScreen" component={TabsNavigator} />
    <SearchStack.Screen name="SearchScreen" component={SearchScreen} />
    <DetailStack.Screen name="DetailScreen" component={DetailScreen} />
    <DetailStack.Screen name="ReadingScreen" component={ReadingScreen} />
  </SearchStack.Navigator>
);

const TabsNavigator = () => (
  <Tabs.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
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
  const appLogin = useSelector(state => state.loginScreen);
  return (
    <NavigationContainer>
      {appLogin?.isLogin ? <DetailStackNavigator /> : <LoginStackNavigator />}
    </NavigationContainer>
  );
}
