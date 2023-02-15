import { View, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { colors } from '../utils/Colors';

export default function BookLoading() {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.loadingStyle]}>
            <LottieView source={require('../../assets/Books/bookLoading.json')} autoPlay loop />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blackTrans,
    }
})