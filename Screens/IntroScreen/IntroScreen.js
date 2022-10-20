import { View, Text, StyleSheet, ImageBackground,Image } from 'react-native'
import { useState } from 'react'
import React from 'react'

import AppIntroSlider from 'react-native-app-intro-slider'
import Icon from 'react-native-vector-icons/Ionicons'

import App from '../../App'
import Navigator from '../../Navigation/Navigator'

export default function IntroScreen({ onEvent }) {
    const [showRealApp, setShowRealApp] = useState(false)
    const renderView = ({ item }) => (
        <View style={styles.slide}>
            <Image style={styles.images} source={item.image} />
            <Text style={styles.text}>{item.text}</Text>
        </View>
    )

    const renderNextButton = () => (
        <View style={styles.buttonCircle}>
            <Icon
                name="arrow-forward-circle-outline"
                color='#FB7849'
                size={50}
            />
        </View>
    )

    const renderDoneButton = () => (
        <View style={styles.buttonCircle}>
            <Icon
                name="checkmark-circle-outline"
                color='#FB7849'
                size={50}
            />
        </View>
    )

    const onDone = () => {
        setShowRealApp(true)
    }

    if (showRealApp) {
        return <Navigator />
    } else {
        return (
            <AppIntroSlider
                renderItem={renderView}
                data={slides}
                onDone={onDone}
                renderNextButton={renderNextButton}
                renderDoneButton={renderDoneButton}
            />
        )
    }
}

const slides = [
    {
        key: 1,
        //title: '--- LAILAH GIFTY AKITA ---',
        text: 'Share Your Favorite Books With You Family And Friends',
        image: require('../../assets/IntroScreen/image1.png')
    },
    {
        key: 2,
        //title: '--- MORTIMER J. ADLER ---',
        text: 'Discover 10 Million Books Shelved Online On Single Click',
        image: require('../../assets/IntroScreen/image2.png')
    },
    {
        key: 3,
        //title: '--- JAMES BURKE ---',
        text: 'But And Sell Books With Us',
        image: require('../../assets/IntroScreen/image3.png')
    }
];

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'cover',
        backgroundColor:'#FFE6BE'
    },
    images:{
        alignItems:'center',
        justifyContent:'center',
        resizeMode:'cover',
    },
    text: {
        fontSize: 26,
        textAlign: 'center',
        width: '80%',
        fontWeight: 'bold',
        color:'#FB7849'
    },
    buttonCircle: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',        
    },

})