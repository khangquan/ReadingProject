import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width
const placeHolderImg = require('../../assets/Books/placeHolderImg.jpg')

export default function BookCard({ bookData, selectBookEvent }) {

    return (
        <TouchableOpacity
            onPress={selectBookEvent}
            style={styles.renderViewStyle}>
            <Image style={styles.flatListImg}
                source={
                    !bookData.img ? { uri: bookData.image }:
                        placeHolderImg 
                } />
            <Text style={styles.flatListTitle}>{bookData.title}</Text>
            <Text style={styles.flatListAuthor}>{bookData.author}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    renderViewStyle: {
        width: windowWidth / 3,
        height: windowWidth / 2,
        marginTop: 20,
        marginBottom: 70,
        marginHorizontal: 8,
    },
    flatListImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    flatListTitle: {
        width: '100%',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
    flatListAuthor: {
        width: '100%',
        textAlign: 'center',
    },
})