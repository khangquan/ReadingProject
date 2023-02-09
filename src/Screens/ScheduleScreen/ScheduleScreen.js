import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

import Icon from 'react-native-vector-icons/Ionicons'
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'react-moment';
import { colors } from '../../utils/Colors'
import { useDispatch } from 'react-redux';
import { LocalNotification } from '../../services/LocalNotification'
import { delSchedule, setSchedule } from '../../redux/actions/AccountAction';
import HeaderBar from '../../components/HeaderBar'

export default function ScheduleScreen({ navigation, route }) {
    const dispatch = useDispatch()
    const userInfo = route.params
    const [userId, setUserId] = useState('')

    const [showPicker, setShowPicker] = useState(false)
    const [timeSelected, setTimeSelected] = useState(new Date())

    const [showTime, setShowTime] = useState('')
    const [hour, setHour] = useState('')
    const [min, setMin] = useState('')

    useEffect(() => {
        setUserId(userInfo.id)
        let userSchedule = userInfo.schedule
        if (userInfo.schedule != null) {
            setHour(userSchedule.getHours())
            setMin(userSchedule.getMinutes())
        }

    }, [])

    const onChange = (event, selectedTime) => {
        const currentTime = selectedTime;
        setShowPicker(false)
        setTimeSelected(currentTime);

        setHour(timeSelected.getHours())
        setMin(timeSelected.getMinutes())

    };

    const handleSetSchedule = (time) => {
        if (!time) {
            Alert.alert('Bạn chưa chọn giờ nhắc!')
        } else {
            dispatch(setSchedule({ time, userId }))
            Alert.alert('Đã lưu lịch nhắc đọc sách')
        }
    };

    const handleDeleteSchedule = () => {
        if (userInfo.schedule === null) {
            Alert.alert('Không có thông tin lịch nhắc để xóa')
        } else {
            dispatch(delSchedule({ userId }))
            Alert.alert('Đã xóa lịch nhắc đọc sách')
        }
    }

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

                <Text style={{ marginTop: 10 }}>Thời gian đã chọn :
                    {hour && min ? ` ${hour} Giờ ${min} Phút` : 'Chưa Đặt Lịch Nhắc'}
                </Text>

                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => setShowPicker(true)}
                >
                    <Text style={{ fontSize: 15, color: 'white' }}>Chọn lại</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => console.log(userInfo)}
                >
                    <Text style={{ fontSize: 15, color: 'white' }}>Chọn lại</Text>
                </TouchableOpacity> */}

                {showPicker && (
                    <DateTimePicker
                        value={timeSelected}
                        mode='time'
                        is24Hour={true}
                        display='default'
                        onChange={onChange}
                    />
                )}
            </View>

            <View style={styles.bottom}>
                <TouchableOpacity style={styles.confirmButton}
                    onPress={() => handleSetSchedule(timeSelected)}
                >
                    <Text style={{ fontSize: 20, color: 'white' }}>Lưu Hẹn Giờ</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton}
                    onPress={handleDeleteSchedule}
                >
                    <Text style={{ fontSize: 20, color: 'white' }}>Xóa Hẹn Giờ</Text>
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