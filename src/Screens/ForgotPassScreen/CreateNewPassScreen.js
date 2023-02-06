import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Alert
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../utils/Colors'
import { Formik } from 'formik'
import { checkRegValidate } from '../LoginScreen/CheckValidate'

const windowWidth = Dimensions.get('window').width

export default function ConfirmScreen({ navigation }) {

    return (
        <ImageBackground
            blurRadius={6}
            source={require('../../../assets/LoginScreen/background.jpg')}
            style={styles.container}>

            <View style={styles.topContent}>
                <TouchableOpacity
                    onPress={() => {

                    }}>
                    <Icon
                        name="chevron-back-outline"
                        size={35}
                        color={colors.primaryOrange}
                    />
                </TouchableOpacity>
            </View>

            <Formik
                initialValues={{
                    pass: '',
                    confirmPass: '',
                }}
                validationSchema={checkRegValidate}
                onSubmit={({ pass, confirmPass }) => {
                    if (pass !== confirmPass) {
                        console.log('Mật khẩu xác nhận không giống với mật khẩu!')
                    } else {
                        console.log('Reset mật khẩu thành công!!')
                    }
                }
                }>
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                }) => (
                    <View style={styles.botContent}>
                        <Text style={styles.title}>Tạo mật khẩu mới</Text>
                        <Text style={styles.text}>Mật khẩu mới của bạn phải khác với mật khẩu cũ</Text>

                        <Text style={styles.inputTextTitle}>Mật khẩu</Text>
                        <View style={styles.textInputStyle}>
                            <TextInput
                                placeholder='Nhập mật khẩu mới của bạn'
                                secureTextEntry={true}
                                onChangeText={handleChange('pass')}
                                onBlur={handleBlur('pass')}
                                value={values.pass}
                            />

                        </View>
                        {errors.pass && touched.pass ? (
                            <Text style={styles.errorText}>{errors.pass}</Text>
                        ) : null}

                        <Text style={styles.inputTextTitle}>Xác nhận mật khẩu</Text>
                        <View style={styles.textInputStyle}>
                            <TextInput
                                placeholder='Xác nhận lại mật khẩu mới của bạn'
                                secureTextEntry={true}
                                onChangeText={handleChange('confirmPass')}
                                onBlur={handleBlur('confirmPass')}
                                value={values.confirmPass}
                            />
                        </View>
                        {errors.confirmPass && touched.confirmPass ? (
                            <Text style={styles.errorText}>{errors.confirmPass}</Text>
                        ) : null}
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                style={styles.buttonCreateWrapper}
                                onPress={handleSubmit}>
                                <Text style={styles.buttonCreate}>Reset mật khẩu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
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
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
        marginHorizontal: 20
    },
    inputTextTitle: {
        marginLeft: 25,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonCreateWrapper: {
        width: '70%',
        backgroundColor: colors.primaryOrange,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 20,
        marginVertical: 20,
    },
    buttonCreate: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    textInputStyle: {
        width: windowWidth - 40,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 8,
        borderRadius: 15,
        backgroundColor: 'white',
        //Add shadow
        elevation: 5,
        shadowColor: 'gray ',
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
    errorText: {
        color: 'red',
        marginLeft: 25,
        marginBottom: 10,
    },
})