import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../utils/Colors'

export default function ConfirmScreen({ navigation }) {
    const handleOpenEmailApp = () => {

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
                        name="chevron-back-outline"
                        size={35}
                        color={colors.primaryOrange}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.cenContent}>
                <Icon name='mail' size={100} color={colors.primaryOrange} />
                <Text style={styles.title}>Kiểm tra lại mail của bạn</Text>
                <Text style={styles.text}>Chúng tôi đã gửi một mail hướng dẫn khôi phục mật khẩu vào email của bạn</Text>


                <TouchableOpacity
                    style={styles.buttonResetWrapper}
                    onPress={handleOpenEmailApp}>
                    <Text style={styles.buttonReset}>Mở ứng dụng email</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { navigation.popToTop()}}>
                    <Text style={[styles.buttonSkip, { color: colors.primaryOrange }]}>Bỏ qua, xác nhận sau</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.botContent}>
                <Text style={[styles.buttonSkip, { color: 'white' }]}>Chưa nhận được mail? thử kiểm tra hộp thư spam của bạn,</Text>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Text style={[styles.buttonSkip, { color: colors.primaryOrange }]}>hoặc thử nhập một email khác</Text>
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
    cenContent: {
        height: '60%',
        width: '100%',
        alignItems: 'center',
    },
    botContent: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
    },

    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    text: {
        textAlign: 'center',
        width: '80%',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    buttonResetWrapper: {
        width: '70%',
        backgroundColor: colors.primaryOrange,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 20,
        marginVertical: 20,
    },
    buttonReset: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonSkip: {
        width: '90%',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})