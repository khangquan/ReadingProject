import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/RegisterAction';

export default function EditUserInfo({navigation, route}) {
  const {params} = route;
  const dispatch = useDispatch()

//   const [fullname,setFullname] = useState('')
//   const [email,setEmail] = useState('')
//   const [pass,setPass] = useState('')
  const [value, setValue] = useState('')
  const [confirmValue, setConfirmValue] = useState('')


  const handleChangeInfo = () => {
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenu}>
        <View style={styles.topContent}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.backStyle}
          >
            <Icon name="chevron-back-outline" size={35} color={'white'} />
          </TouchableOpacity>
          <Text style={styles.topTextStyle}>Thay đổi thông tin</Text>
        </View>
      </View>

      <View style={styles.botContent}>
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>{params} mới: </Text>
          <View style={styles.textBoxAndEdit}>
            <TextInput 
            onChangeText={(text) => setValue(text)}
            value={value}
            style={styles.textBoxStyle}
            />
          </View>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>Xác nhận {params} mới: </Text>
          <View style={styles.textBoxAndEdit}>
            <TextInput 
            value={confirmValue}
            onChangeText={(text) => setConfirmValue(text)}
            style={styles.textBoxStyle} 
            />
          </View>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleChangeInfo}>
            <Text style={{fontSize: 20, color: 'white'}}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topMenu: {
    height: '10%',
    width: '100%',
    backgroundColor: '#FB7849',
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    height: '100%',
    alignItems: 'center',
  },
  topTextStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFF',
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
    color: 'black',
    width: '30%',
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
  confirmButton:{
    width: '40%',
    height: '8%',
    backgroundColor: '#FB7849',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  }
});
