import {
    StyleSheet,
    Text, View,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { IconString } from '../utils/Icon'
import { colors } from '../utils/Colors'

export default function UserInfoBox({
    title,
    value,
    onEvent,
    onPassBoxEvent,
    isPassBox,
    showPass
}) {
    return (
        <View style={styles.userInfo}>
            <Text style={styles.userInfoText}>{title}</Text>
            <View style={styles.textBoxAndEdit}>
                <TextInput
                    style={styles.textBoxStyle}
                    value={value}
                    editable={false}
                    secureTextEntry={showPass ? true : false}
                />

                {
                    isPassBox ?
                        (<TouchableOpacity onPress={onPassBoxEvent}>
                            {showPass ? (
                                <Icon name={IconString.showPass} size={25} color={colors.black} />
                            ) : (
                                <Icon name={IconString.hiddenPass} size={25} color={colors.black} />
                            )}
                        </TouchableOpacity>) : null
                }

                <TouchableOpacity
                    onPress={onEvent}>
                    <Icon name={IconString.edit} size={25} color={colors.black} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        width: '95%',
    },
    userInfoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.black,
    },
    textBoxAndEdit: {
        backgroundColor: colors.white,
        width: '70%',
        borderWidth: 1,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    textBoxStyle: {
        width: '80%',
        fontSize: 20,
        color: colors.black,
    },
})