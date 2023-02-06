import { View, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

export default function Loading() {
    return (
        <View style={[StyleSheet.absoluteFillObject , styles.loadingStyle]}>
            <LottieView source={require('../../assets/LoginScreen/loading.json')} autoPlay loop />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
})