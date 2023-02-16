import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useRef, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import LottieView from 'lottie-react-native'

export default function MenuIconBar({ title, textTitle, onEvent, color, isAnimation, isLike }) {
  const heartAnimation = useRef(null)
  const isFirstRun = useRef(true)

  useEffect(() => {
    if (isFirstRun.current) {
      if (isLike) {
        heartAnimation.current?.play(100, 100)
      } else {
        heartAnimation.current?.play(20, 20)
      }
      isFirstRun.current = false
    } else if (isLike) {
      heartAnimation.current?.play(20, 100)
    } else {
      heartAnimation.current?.play(70, 40)
    }
  }, [isLike])

  return (
    <>
      {
        isAnimation ?

          <TouchableOpacity onPress={onEvent} style={styles.item} >
            <LottieView
              style={{ height: 60 }}
              ref={heartAnimation}
              source={require('../../assets/Books/like.json')}
              autoPlay={false}
              loop={false}
            />
            <Text style={{ bottom: 13 }}>Thích</Text>
          </TouchableOpacity>

          :

          (<TouchableOpacity onPress={onEvent} style={styles.item}>
            <Icon name={title} size={30} color={color} />
            <Text>{textTitle}</Text>
          </TouchableOpacity>)
      }
    </>

  )
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
