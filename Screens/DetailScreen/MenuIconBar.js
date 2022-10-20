import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

export default function MenuIconBar({ title, textTitle, onEvent, color }) {
  return (
    <TouchableOpacity 
    onPress={onEvent}
    style={styles.item}
    >
      <Icon name={title} size={30} color={color}/>
      <Text>{textTitle}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item:{
    alignItems: 'center',
    justifyContent: 'center',
  },
})