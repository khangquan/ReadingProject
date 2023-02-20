import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import {IconString} from '../../utils/Icon'

import Icon from 'react-native-vector-icons/Ionicons'
import DeviceBrightness from '@adrianso/react-native-device-brightness'

import {colors} from '../../utils/Colors'
import Slider from '@react-native-community/slider'
import {ScrollView} from 'react-native-gesture-handler'

export default function ReadingScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false)
  const [textSize, setTextSize] = useState(23)
  const [darkScreen, setDarkScreen] = useState(false)
  const [brightness, setBrightness] = useState(0.2)
  const [textLineHeight, setTextLineHeight] = useState(40)

  //Back to top Event
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0)
  const scroll = useRef()

  useEffect(() => {
    DeviceBrightness.setBrightnessLevel(brightness)
  }, [])

  const getBrightness = async () => {
    const brightness = await DeviceBrightness.getBrightnessLevel()
    alert('Độ sáng hiện tại ' + brightness)
  }

  const handleResetSetting = () => {
    setTextSize(23)
    setDarkScreen(false)
    setTextLineHeight(40)
  }

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: darkScreen ? colors.black : colors.white},
      ]}
    >
      <View style={styles.topMenu}>
        <View style={styles.topContent}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}
          >
            <Icon
              name={IconString.goBack}
              size={35}
              color={darkScreen ? colors.white : colors.primaryOrange}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Icon
              name={IconString.menu}
              size={35}
              color={darkScreen ? colors.white : colors.primaryOrange}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback
          onPressOut={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <View style={styles.rightView}>
            <View style={styles.modalView}>
              {/* Chỉnh tăng giảm font chữ */}
              <Text style={styles.modalItemTitle}>Kích cỡ chữ:</Text>
              <View style={styles.modalItemStyle}>
                <TouchableOpacity
                  onPress={() => {
                    if (textSize >= 15) {
                      setTextSize(textSize - 3)
                    }
                  }}
                >
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>A</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    if (textSize <= 30) {
                      setTextSize(textSize + 3)
                    }
                  }}
                >
                  <Text style={{fontWeight: 'bold', fontSize: 30}}>A</Text>
                </TouchableOpacity>
              </View>

              {/* Chỉnh dark/white mode */}
              <Text style={styles.modalItemTitle}>Màu nền:</Text>
              <View style={styles.modalItemStyle}>
                <TouchableOpacity
                  style={[styles.bgclButton, {backgroundColor: colors.white}]}
                  onPress={() => setDarkScreen(false)}
                >
                  {darkScreen ? null : (
                    <Icon
                      name={IconString.checkmark}
                      size={25}
                      color={colors.black}
                    />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.bgclButton, {backgroundColor: colors.black}]}
                  onPress={() => setDarkScreen(true)}
                >
                  {darkScreen ? (
                    <Icon
                      name={IconString.checkmark}
                      size={25}
                      color={colors.white}
                    />
                  ) : null}
                </TouchableOpacity>
              </View>

              {/* Chỉnh khoảng cách dòng */}
              <Text style={styles.modalItemTitle}>Khoảng cách dòng:</Text>
              <View style={styles.modalItemStyle}>
                <TouchableOpacity
                  style={[
                    styles.lineHeighTextStyle,
                    {
                      backgroundColor:
                        textLineHeight === 30 ? colors.lightGreen : null,
                    },
                  ]}
                  onPress={() => setTextLineHeight(30)}
                >
                  <Text style={{fontSize: 20}}>Nhỏ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.lineHeighTextStyle,
                    {
                      backgroundColor:
                        textLineHeight === 40 ? colors.lightGreen : null,
                    },
                  ]}
                  onPress={() => setTextLineHeight(40)}
                >
                  <Text style={{fontSize: 20}}>Trung Bình</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.lineHeighTextStyle,
                    {
                      backgroundColor:
                        textLineHeight === 50 ? colors.lightGreen : null,
                    },
                  ]}
                  onPress={() => setTextLineHeight(50)}
                >
                  <Text style={{fontSize: 20}}>Lớn</Text>
                </TouchableOpacity>
              </View>

              {/* Chỉnh độ sáng màn hình */}
              <Text style={styles.modalItemTitle}>Độ sáng:</Text>
              <View style={styles.modalItemStyle}>
                <Icon name={IconString.moon} size={20} />
                <Slider
                  style={{width: 180, height: 40, marginHorizontal: 10}}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor={colors.primaryOrange}
                  maximumTrackTintColor={colors.black}
                  value={brightness}
                  onValueChange={brightness => {
                    setBrightness(brightness)
                    DeviceBrightness.setBrightnessLevel(brightness)
                  }}
                />
                <Icon name={IconString.sun} size={30} />
              </View>

              <TouchableOpacity  onPress={getBrightness}>
                <Text>Độ sáng hiện tại</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{marginVertical: 10}} onPress={handleResetSetting}>
                <Text>Đặt lại tùy chỉnh</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.bookContentStyle}>
        <ScrollView
          ref={scroll}
          onScroll={event => {
            setContentVerticalOffset(event.nativeEvent.contentOffset.y)
          }}
        >
          <Text
            style={{
              fontSize: textSize,
              color: darkScreen ? colors.white : colors.black,
              lineHeight: textLineHeight,
            }}
          >
            Thực tập hạnh phúc Theo tôi, hạnh phúc có nghĩa là ít đau khổ.Nếu
            không chuyển hóa được đau khổ thì không thể nào có hạnh phúc. Rất
            nhiều người đã đi tìm hạnh phúc từ bên ngoài, nhưng hạnh phúc thật
            sự chỉ có thể có được tự bên trong.Theo lối sống bây giờ, người ta
            cho rằng hạnh phúc là có thật nhiều tiền bạc, nhiều quyền lực và có
            địa vị cao sang trong xã hội.Nhưng nếu nhìn cho kỹ thì sẽ thấy có
            rất nhiều người giàu sang hay nổi tiếng mà vẫn đau khổ, mà vẫn tự
            tử. Vào thời Bụt, Bụt và Tăng đoàn của Ngài, mỗi vị chẳng có gì
            ngoài ba chiếc áo và một bình bát thế mà quý Ngài rất mực hạnh phúc
            bởi vì quý Ngài đã đạt được một điều vô cùng quý báu, đó là tự do.
            Thực tập hạnh phúc Theo tôi, hạnh phúc có nghĩa là ít đau khổ.Nếu
            không chuyển hóa được đau khổ thì không thể nào có hạnh phúc. Rất
            nhiều người đã đi tìm hạnh phúc từ bên ngoài, nhưng hạnh phúc thật
            sự chỉ có thể có được tự bên trong.Theo lối sống bây giờ, người ta
            cho rằng hạnh phúc là có thật nhiều tiền bạc, nhiều quyền lực và có
            địa vị cao sang trong xã hội.Nhưng nếu nhìn cho kỹ thì sẽ thấy có
            rất nhiều người giàu sang hay nổi tiếng mà vẫn đau khổ, mà vẫn tự
            tử. Vào thời Bụt, Bụt và Tăng đoàn của Ngài, mỗi vị chẳng có gì
            ngoài ba chiếc áo và một bình bát thế mà quý Ngài rất mực hạnh phúc
            bởi vì quý Ngài đã đạt được một điều vô cùng quý báu, đó là tự do.
          </Text>
        </ScrollView>
      </View>

      {/* Back to top Button */}
      {contentVerticalOffset > 300 ? (
        <TouchableOpacity
          style={styles.backToTopStyle}
          onPress={() => scroll.current.scrollTo(0)}
        >
          <Icon
            name={IconString.goToTop}
            size={60}
            color={colors.primaryOrange}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topMenu: {
    height: '5%',
    width: '100%',
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    height: '100%',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  bookContentStyle: {
    alignItems: 'center',
    flex: 1,
    margin: 20,
  },

  modalView: {
    height: 450,
    width: 320,
    marginTop: 20,
    marginRight: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 30,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  rightView: {
    flex: 1,
    alignItems: 'flex-end',
    margin: 20,
  },

  modalItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalItemStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    marginBottom: 20,
  },
  bgclButton: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 1,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  lineHeighTextStyle: {
    borderRadius: 40,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backToTopStyle: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    opacity: 0.3,
  },
})
