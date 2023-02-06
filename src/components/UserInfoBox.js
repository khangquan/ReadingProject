import {
    StyleSheet,
    Text, View,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

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
                                <Icon name="eye" size={25} color={'black'} />
                            ) : (
                                <Icon name="eye-off" size={25} color={'black'} />
                            )}
                        </TouchableOpacity>) : null
                }

                <TouchableOpacity
                    onPress={onEvent}>
                    <Icon name="create" size={25} color={'black'} />
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
        color: 'black',
    },
    textBoxAndEdit: {
        backgroundColor: 'white',
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
        color: 'black',
    },
})