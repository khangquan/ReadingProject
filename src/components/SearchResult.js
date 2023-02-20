import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width

export default function SearchResult({ bookData, selectBookEvent, searchValue }) {
    const renderSearch = ({ item }) => {
        let lowerCaseValue = searchValue.toLowerCase()

        let title = item.title.toLowerCase()
        let removeAccents = title.normalize("NFD").replace(/\p{Diacritic}/gu, "")
        let author = item.author.toLowerCase()

        if (lowerCaseValue === '') {
            return (null)
        } else if (removeAccents.includes(lowerCaseValue) || author.includes(lowerCaseValue)) {
            return (
                <TouchableOpacity
                    onPress={() => selectBookEvent(item)}
                    style={styles.renderViewStyle}>
                    <Image style={styles.flatListImg}
                        source={{ uri: item.image }}
                    />
                    <Text style={styles.flatListTitle}>{item.title}</Text>
                </TouchableOpacity>
            )
        }
    }

    return (
        <View style={styles.Content}>
            <FlatList
                data={bookData}
                renderItem={renderSearch}
                numColumns={3}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    Content: {
        flex: 1,
    },
    renderViewStyle: {
        width: windowWidth / 3,
        height: windowWidth / 2,
        marginBottom: 60,
        padding: 10,
    },
    flatListImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    flatListTitle: {
        fontSize: 15,
        alignSelf: 'center',
        fontWeight: '500',
        textAlign: 'center'
    },
})