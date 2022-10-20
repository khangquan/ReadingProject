import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native'
import React from 'react'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default function ReadingScreen() {
    return (
        <View style={styles.container}>
            <Text>dsadasdas</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    
})