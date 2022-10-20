import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';
import UserScreen from '../Screens/UserScreen/UserScreen';
import BooksTypeScreen from '../Screens/BooksTypeScreen/BooksTypeScreen';
import DetailScreen from '../Screens/DetailScreen/DetailScreen';
import AllBooksScreen from '../Screens/AllBooksScreen/AllBooksScreen';


const Tabs = createBottomTabNavigator()
const LoginStack = createNativeStackNavigator()
const DetailStack = createNativeStackNavigator()
const AllBookStack = createNativeStackNavigator()

const LoginStackNavigator = () => (
    <LoginStack.Navigator screenOptions={{headerShown:false}}>
        <LoginStack.Screen name='LoginScreen' component={LoginScreen}/>
        <LoginStack.Screen name='HomeScreen' component={HomeScreen}/>
    </LoginStack.Navigator>
)

const AllBookStackNavigator = () => (
    <AllBookStack.Navigator screenOptions={{headerShown:false}}>
        <AllBookStack.Screen name='BooksTypeScreen' component={BooksTypeScreen}/>
        <AllBookStack.Screen name='AllBooksScreen' component={AllBooksScreen}/>
        <DetailStack.Screen name='DetailScreen' component={DetailScreen} />
    </AllBookStack.Navigator>
)

const DetailStackNavigator = () => (
    <DetailStack.Navigator screenOptions={{headerShown:false}}>
        <DetailStack.Screen name='HomeScreen' component={HomeScreen} />
        <DetailStack.Screen name='AllBooksScreen' component={AllBooksScreen} />
        <DetailStack.Screen name='DetailScreen' component={DetailScreen} />
    </DetailStack.Navigator>
)

const TabsNavigator = () => (
    <Tabs.Navigator screenOptions={({route}) => ({
        tabBarIcon: ({focused,color,size}) => {
            let iconName
            if(route.name === 'Trang Chủ'){
                iconName = 'home-outline'
                focused?size=35:size=30
            } else if(route.name === 'Tài Khoản'){
                iconName = 'person-circle-outline'
                focused?size=35:size=30
            } else if(route.name === 'Thể Loại'){
                iconName = 'apps-outline'
                focused?size=35:size=30
            }
            return <Icon name={iconName} size={size} color={color}/>
        },
        tabBarLabelStyle:{
            fontSize:14,
        },        
        tabBarStyle:{
            borderTopWidth:2,
            height:'12%',
        },
        headerShown:false,
        tabBarActiveTintColor:'#FB7849',
        tabBarInactiveTintColor:'lightgray',
    })}
    >
        <Tabs.Screen name='Trang Chủ' component={DetailStackNavigator}/>
        <Tabs.Screen name='Thể Loại' component={AllBookStackNavigator}/>
        <Tabs.Screen name='Tài Khoản' component={UserScreen}/>
    </Tabs.Navigator>
)


export default function Navigator() {
    const appLogin = useSelector(state => state.loginScreen)
    return (
        <NavigationContainer>
            {  
                appLogin?.isLogin?
                <TabsNavigator/>
                :
                <LoginStackNavigator/>
            }
        </NavigationContainer>
    )
}