import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import GestureRecognizer from 'react-native-swipe-gestures'
import {Avatar} from '@react-native-material/core'
import {colors} from '../utils/Colors'
import {IconString} from '../utils/Icon'

import {useDispatch, useSelector} from 'react-redux'
import {postComment, deleteComment} from '../redux/actions/GetBookAction'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default function Comments({onEvent, visible, userInfo}) {
  const [commentData, setCommentData] = useState('')
  const [userComments, setUserComments] = useState([])
  const {bookData} = useSelector(state => state.bookGetData)
  const dispatch = useDispatch()

  const scroll = useRef()

  useEffect(() => {
    setUserComments(bookData.comments)
  }, [])

  const handleSendComment = bookData => {
    if (!commentData || commentData.length === null || commentData.length === 0) {
      alert('Bạn chưa nhập bình luận')
    } else {
      dispatch(
        postComment({
          id: new Date().getTime(),
          title: bookData.title,
          comments: commentData,
          userAvatar: userInfo.avatar,
          userName: userInfo.fullname,
        }),
      )
      setCommentData('')
    }
  }

  const handleDeleteComment = data => {
    Alert.alert('Thông báo!', 'Bạn có muốn xóa bình luận này không?', [
      {
        text: 'Yes',
        onPress: () => {
          dispatch(
            deleteComment({
              commentId: data.id,
              bookTitle: data.title,
            }),
          )
        },
      },
      {text: 'No', onPress: () => {}},
    ])
  }

  return (
    <GestureRecognizer onSwipeDown={onEvent}>
      <Modal visible={visible} animationType={'slide'} transparent={true}>
          <View style={styles.modal}>
            <View style={styles.commentBoxStyle}>
              <ScrollView
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}
                ref={scroll}
                onContentSizeChange={() => scroll.current.scrollToEnd()}
              >
                {userComments.map(item => {
                  return (
                    <View style={styles.comments}>
                      {item.userAvatar == null ? (
                        <Avatar
                          autoColor={true}
                          label={item.userName}
                          size={40}
                        />
                      ) : (
                        <Avatar
                          autoColor={true}
                          image={{uri: item.userAvatar}}
                          size={40}
                        />
                      )}
                      <View style={styles.commentWrapper}>
                        <Text style={styles.userName}>{item.userName}</Text>
                        <Text style={styles.userComment}>{item.comments}</Text>
                        {userInfo.fullname !== userComments.userName ? (
                          <TouchableOpacity
                            style={styles.delete}
                            onPress={() => handleDeleteComment(item)}
                          >
                            <Text style={styles.button}>Delete</Text>
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    </View>
                  )
                })}
              </ScrollView>

              <View style={styles.commentsInput}>
                <TextInput
                  style={styles.inputComment}
                  placeholder="Viết bình luận"
                  value={commentData}
                  onChangeText={text => setCommentData(text)}
                  onSubmitEditing={() => handleSendComment(bookData)}
                />
              </View>
            </View>
          </View>
      </Modal>
    </GestureRecognizer>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  commentBoxStyle: {
    width: windowWidth,
    height: windowHeight - 100,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  comments: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  commentWrapper: {
    backgroundColor: colors.introColor,
    width: '85%',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'center',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.black,
  },
  userComment: {
    marginTop: 5,
    marginBottom: 20,
  },
  // like: {
  //   position: 'absolute',
  //   bottom: 0,
  //   right: 160,
  // },
  // reply: {
  //   position: 'absolute',
  //   bottom: 0,
  //   right: 100,
  // },
  delete: {
    position: 'absolute',
    bottom: 0,
    right: 30,
  },
  button: {
    fontSize: 18,
  },
  commentsInput: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primaryOrange,
  },
  inputComment: {
    width: '100%',
    borderRadius: 20,
    fontSize: 20,
    padding: 10,
  },
})
