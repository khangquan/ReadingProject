import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const windowWidth = Dimensions.get('window').width
export default function TextBox({
  title,
  isSecure,
  onEvent,
  isPasswordBox,
  onChangeText,
  value,
  onBlur,
}) {
  return (
    <View style={styles.inputText}>
      <TextInput
        style={{fontSize: 15, width: '90%'}}
        placeholder={title}
        autoCapitalize="none"
        secureTextEntry={isSecure}
        onChangeText={onChangeText}
        value={value}
        onBlur={onBlur}
      />
      {isPasswordBox ? (
        <TouchableOpacity onPress={onEvent}>
          {isSecure ? (
            <Icon name="eye-outline" size={30} color="black" />
          ) : (
            <Icon name="eye-off-outline" size={30} color="black" />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  inputText: {
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
})
