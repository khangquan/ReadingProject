import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../../utils/Colors'
import { IconString } from '../../utils/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { editFullname, editEmail, editPassword } from '../../redux/actions/AccountAction'
import HeaderBar from '../../components/HeaderBar'

export default function EditUserInfoScreen({ navigation, route }) {
  const { params } = route
  const dispatch = useDispatch()
  const { userAccounts } = useSelector(state => state.register)

  const [value, setValue] = useState('')
  const [confirmValue, setConfirmValue] = useState('')

  const handleChangeInfo = () => {
    if (params.title === 'Họ Tên') {
      let accIndex = userAccounts.findIndex(
        item => item.fullname === params.name,
      )
      dispatch(
        editFullname({
          id: userAccounts[accIndex].id,
          fullname: value,
        }),
      )
    } else if (params.title === 'Email') {
      let accIndex = userAccounts.findIndex(item => item.email === params.email)
      dispatch(
        editEmail({
          id: userAccounts[accIndex].id,
          email: value,
        }),
      )
    } else {
      let accIndex = userAccounts.findIndex(item => item.pass === params.pass)
      dispatch(
        editPassword({
          id: userAccounts[accIndex].id,
          pass: value,
        }),
      )
    }

    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        title={'Thay đổi thông tin'}
        leftItem={IconString.goBack}
        onLeftEvent={() => navigation.goBack()}
      />

      <View style={styles.botContent}>
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>{params.title} cũ: </Text>
          <View style={styles.textBoxAndEdit}>
            <TextInput
              editable={false}
              value={params.name || params.email || params.pass}
              style={styles.textBoxStyle}
            />
          </View>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>{params.title} mới: </Text>
          <View style={styles.textBoxAndEdit}>
            <TextInput
              onChangeText={text => setValue(text)}
              value={value}
              style={styles.textBoxStyle}
            />
          </View>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>Xác nhận {params.title} mới: </Text>
          <View style={styles.textBoxAndEdit}>
            <TextInput
              value={confirmValue}
              onChangeText={text => setConfirmValue(text)}
              style={styles.textBoxStyle}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleChangeInfo}>
          <Text style={{ fontSize: 20, color: colors.white }}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  botContent: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    width: '30%',
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
  confirmButton: {
    width: '40%',
    height: '8%',
    backgroundColor: colors.primaryOrange,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
})
