import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import { colors } from '../utils/Colors'
import Icon from 'react-native-vector-icons/Ionicons'
import { IconString } from '../utils/Icon'

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
                    <Icon name={IconString.goBack} size={30} color={colors.white} />
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
                            <Icon name={IconString.close} size={30} />
                        </TouchableOpacity>
                    ) : null}

                    <View style={styles.searchIconStyle}>
                        <Icon name={IconString.search} size={30} />
                    </View>
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
        color: colors.white,
    },
    searchBoxStyle: {
        padding: 10,
        width: '75%',
        borderRadius: 10,
    },
    textInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
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