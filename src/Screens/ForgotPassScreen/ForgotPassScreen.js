import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Dimensions
} from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { IconString } from '../../utils/Icon'
import { colors } from '../../utils/Colors'

const windowWidth = Dimensions.get('window').width

export default function ForgetPassScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const handleSubmit = () => {
        navigation.navigate('ConfirmScreen')
    }
    return (
        <ImageBackground
            blurRadius={6}
            source={require('../../../assets/LoginScreen/background.jpg')}
            style={styles.container}>
            <View style={styles.topContent}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}>
                    <Icon
                        name={IconString.goBack}
                        size={35}
                        color={colors.primaryOrange}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.botContent}>
                <Text style={styles.title}>Reset mật khẩu</Text>
                <Text style={styles.text}>Vui lòng nhập email quên mật khẩu của bạn:</Text>
                <View style={styles.textInputStyle}>
                    <TextInput
                        placeholder='info@example.com'
                        isSecure={false}
                        onChangeText={(text) => { setEmail(text) }}
                        value={email}
                    />
                </View>

                <TouchableOpacity
                    style={styles.buttonResetWrapper}
                    onPress={handleSubmit}>
                    <Text style={styles.buttonReset}>Reset mật khẩu</Text>
                </TouchableOpacity>
            </View>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    topContent: {
        height: '20%',
        width: '100%',
        marginTop: 20,
        marginLeft: 20,
    },
    botContent: {
        height: '80%',
        width: '100%',
        alignItems: 'center',
    },
    textInputStyle: {
        width: windowWidth - 40,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 8,
        borderRadius: 15,
        backgroundColor: colors.white,
        //Add shadow
        elevation: 5,
        shadowColor: colors.gray,
        shadowOpacity: 5,
        shadowRadius: 5,
        shadowOffset: {
            height: 5,
            width: 5,
        },
        //Position for the eye
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: colors.white,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    text: {
        textAlign: 'center',
        width: '80%',
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 20,
    },
    buttonResetWrapper: {
        width: '90%',
        backgroundColor: colors.primaryOrange,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 20,
        marginVertical: 20,
    },
    buttonReset: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
    },


})