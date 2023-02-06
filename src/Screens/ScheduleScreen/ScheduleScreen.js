import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import Icon from 'react-native-vector-icons/Ionicons'
import DateTimePicker from '@react-native-community/datetimepicker';

import { colors } from '../../utils/Colors'
import { LocalNotification } from '../../services/LocalNotification'
import HeaderBar from '../../components/HeaderBar'

export default function ScheduleScreen({ navigation }) {
    const [showPicker, setShowPicker] = useState(false)
    const [time, setTime] = useState(new Date())
    const [text, setText] = useState('')
    const onChange = (event, selectedTime) => {
        const currentTime = selectedTime;
        setShowPicker(false)
        setTime(currentTime);

        let tempTime = new Date(currentTime)
        let ftime = ' ' + tempTime.getHours() + ' Giờ ' + tempTime.getMinutes() + ' Phút '
        setText(ftime)
    };

    const handleNotification = () => {
        LocalNotification()
    };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBar
                title={'Hẹn Giờ Đọc Sách'}
                leftItem={'chevron-back-outline'}
                onLeftEvent={() => navigation.goBack()}
            />
            <View style={styles.center}>
                <Icon name='alarm-outline' size={100} color={colors.primaryOrange} />
                <Text style={styles.textStyle}>Cho phép ứng dụng gửi Notification nhắc nhở bạn đọc sách hàng ngày</Text>

                <Text style={{ marginTop: 10 }}>Thời gian đã chọn:
                    {text ? text : ' Chưa chọn thời gian'}
                </Text>

                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => setShowPicker(true)}
                >
                    <Text style={{ fontSize: 15, color: 'white' }}>Chọn lại</Text>
                </TouchableOpacity>

                {showPicker && (
                    <DateTimePicker
                        value={time}
                        mode='time'
                        is24Hour={true}
                        display='default'
                        onChange={onChange}
                    />
                )}
            </View>

            <View style={styles.bottom}>
                <TouchableOpacity style={styles.confirmButton}
                    onPress={handleNotification}
                >
                    <Text style={{ fontSize: 20, color: 'white' }}>Xác Nhận</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton}
                >
                    <Text style={{ fontSize: 20, color: 'white' }}>Hủy</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 20,
        textAlign: 'center',
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '10%',
        width: '100%',
        borderWidth: 1
    },
    buttonStyle: {
        backgroundColor: colors.primaryOrange,
        borderRadius: 20,
        marginTop: 10,
        width: 100, height: 50,
        alignItems: 'center', justifyContent: 'center'
    },

    confirmButton: {
        width: '50%',
        height: '100%',
        borderRightWidth: 1,
        backgroundColor: colors.primaryOrange,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    cancelButton: {
        width: '50%',
        height: '100%',
        backgroundColor: colors.primaryOrange,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
})