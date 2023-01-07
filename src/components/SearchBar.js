import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import { colors } from '../defines/Colors'
import Icon from 'react-native-vector-icons/Ionicons'

export default function SearchBar({
    goBackEvent,
    onChangeText,
    searchValue,
    setSearchEvent,
    searchEvent,
}) {
    return (
        <View style={styles.topMenu}>
            <View style={styles.topContent}>
                <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={goBackEvent}>
                    <Icon name="chevron-back-outline" size={30} color="white" />
                </TouchableOpacity>

                <View style={styles.textInputWrapper}>
                    <TextInput
                        value={searchValue}
                        onChangeText={onChangeText}
                        style={styles.searchBoxStyle}
                        placeholder="Tên sách, tác giả,... cần tìm"
                    />
                    {searchValue ? (
                        <TouchableOpacity
                            style={styles.clearInputStyle}
                            onPress={setSearchEvent}>
                            <Icon name="close-outline" size={30} />
                        </TouchableOpacity>
                    ) : null}

                    <TouchableOpacity
                        style={styles.searchIconStyle}
                        onPress={searchEvent}>
                        <Icon name="search" size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topMenu: {
        height: '10%',
        width: '100%',
        backgroundColor: colors.primaryOrange,
    },
    topContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        //marginHorizontal: 10
    },
    topTextStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    searchBoxStyle: {
        padding: 10,
        width: '75%',
        borderRadius: 10,
    },
    textInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '80%',
        marginRight: 20,
        borderRadius: 10,
    },
    clearInputStyle: {
        width: '10%',
    },
    searchIconStyle: {
        position: 'absolute',
        right: 0,
        width: '15%',
    },
})