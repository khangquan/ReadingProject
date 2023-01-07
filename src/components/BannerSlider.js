import { View, Dimensions } from 'react-native'
import React from 'react'
import { ImageSlider } from 'react-native-image-slider-banner'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function BannerSlider() {
  return (
    <View>
      <ImageSlider
          data={[
            {
              img: 'https://theme.hstatic.net/200000020612/1000524269/14/hmodule_banner_img2_1.jpg?v=768',
            },
            {
              img: 'https://bizweb.dktcdn.net/100/370/339/themes/744741/assets/slider_3_image.jpg?1632297125018',
            },
            {
              img: 'https://theme.hstatic.net/200000017360/1000763157/14/ms_banner_img5.jpg?v=112',
            },
            {
              img: 'https://theme.hstatic.net/200000510041/1000879666/14/hmodule_banner_img1_1.jpg?v=128',
            },
            {
              img: 'https://sunibooks.com/wp-content/uploads/2022/01/Banner-sach-giao-duc-2.png',
            },
          ]}
          autoPlay={true}
          preview={false}
          timer={4000}
          caroselImageContainerStyle={{
            width: windowWidth,
            height: windowHeight * 0.25,
          }}
          caroselImageStyle={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
          indicatorContainerStyle={{ bottom: 0 }}
        />
    </View>
  )
}