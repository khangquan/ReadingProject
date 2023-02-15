import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native'
import React, {useEffect, useState} from 'react'

import Icon from 'react-native-vector-icons/Ionicons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { IconString } from '../../utils/Icon'
import {colors} from '../../utils/Colors'
import {useDispatch} from 'react-redux'
import {LocalNotificationSchedule, CancelAllNotification} from '../../services/LocalNotification'
import {delSchedule, setSchedule} from '../../redux/actions/AccountAction'
import HeaderBar from '../../components/HeaderBar'

export default function ScheduleScreen({navigation, route}) {
  const dispatch = useDispatch()
  const userInfo = route.params
  const [userId, setUserId] = useState('')

  const [showPicker, setShowPicker] = useState(false)
  const [timeSelected, setTimeSelected] = useState(new Date())
  const [showTime, setShowTime] = useState()

  useEffect(() => {
    setUserId(userInfo.id)
    let userSchedule = userInfo.schedule
    if(userSchedule) {
        setTimeSelected(userSchedule)
        setShowTime(userSchedule)
    }
  }, [])

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime
    setShowPicker(false)
    setTimeSelected(currentTime)
    setShowTime(currentTime)
  }

  const handleSetSchedule = time => {
    if (!showTime) {
      Alert.alert('Bạn chưa chọn giờ nhắc!')
    } else {
      dispatch(setSchedule({time, userId}))
      Alert.alert('Đã lưu lịch nhắc đọc sách')
      LocalNotificationSchedule(userInfo.schedule)
      setTimeSelected(time)
    }
  }

  const handleDeleteSchedule = () => {
    if (userInfo.schedule === null) {
      Alert.alert('Không có thông tin lịch nhắc để xóa')
    } else {
      dispatch(delSchedule({userId}))
      Alert.alert('Đã xóa lịch nhắc đọc sách')
      CancelAllNotification()
      setTimeSelected(new Date())
      setShowTime('')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        title={'Hẹn Giờ Đọc Sách'}
        leftItem={IconString.goBack}
        onLeftEvent={() => navigation.goBack()}
      />
      <View style={styles.center}>
        <Icon name={IconString.alarm} size={100} color={colors.primaryOrange} />
        <Text style={styles.textStyle}>
          Cho phép ứng dụng gửi Notification nhắc nhở bạn đọc sách hàng ngày
        </Text>

        <Text style={{marginTop: 10}}>
          Thời gian đã chọn :
          {showTime ? ` ${timeSelected.getHours()} Giờ ${timeSelected.getMinutes()} Phút` : 'Chưa Đặt Lịch Nhắc'}
        </Text>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => setShowPicker(true)}
        >
          <Text style={{fontSize: 15, color: colors.white}}>Chọn lại</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={timeSelected}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => handleSetSchedule(timeSelected)}
        >
          <Text style={{fontSize: 20, color: colors.white}}>Lưu Hẹn Giờ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleDeleteSchedule}
        >
          <Text style={{fontSize: 20, color: colors.white}}>Xóa Hẹn Giờ</Text>
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
    alignItems: 'center',
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
    borderWidth: 1,
  },
  buttonStyle: {
    backgroundColor: colors.primaryOrange,
    borderRadius: 20,
    marginTop: 10,
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
