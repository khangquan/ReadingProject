import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native'
import React, {useState, useEffect} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import {Avatar} from '@react-native-material/core'
import {colors} from '../utils/Colors'

import {useDispatch, useSelector} from 'react-redux'
import {postComment, deleteComment} from '../redux/actions/GetBookAction'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default function Comments({onEvent, visible, userInfo}) {
  const [commentData, setCommentData] = useState()
  const [userComments, setUserComments] = useState([])
  const {bookData} = useSelector(state => state.bookGetData)
  const dispatch = useDispatch()

  useEffect(() => {
    setUserComments(bookData.comments)
  }, [])

  const handleSendComment = bookData => {
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
    <Modal visible={visible} animationType={'slide'} transparent={true}>
      <View style={styles.modal}>
        <View style={styles.commentBoxStyle}>
          <TouchableOpacity style={styles.closeModal} onPress={onEvent}>
            <Text style={styles.closeModalText}> X </Text>
          </TouchableOpacity>
          <ScrollView>
            {userComments.map(item => {
              return (
                <View style={styles.comments}>
                  {item.userAvatar == null ? (
                    <Avatar autoColor={true} label={item.userName} size={40} />
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
                  </View>

                  {/* <TouchableOpacity
                    style={styles.like}
                    onPress={() => console.log(userInfo)}
                  >
                    <Text style={styles.button}>Like</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.reply}>
                    <Text style={styles.button}>Reply</Text>
                  </TouchableOpacity> */}

                  {userInfo.fullname !== userComments.userName ? (
                    <TouchableOpacity
                      style={styles.delete}
                      onPress={() => handleDeleteComment(item)}
                    >
                      <Text style={styles.button}>Delete</Text>
                    </TouchableOpacity>
                  ) : null}
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
            />

            <TouchableOpacity
              style={styles.sendComment}
              onPress={() => handleSendComment(bookData)}
            >
              <Icon name="send" size={30} color={colors.primaryOrange} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  closeModal: {
    position: 'absolute',
    right: 10,
    top: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeModalText: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: colors.primaryOrange,
    color: colors.white,
    borderRadius: 50,
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
  like: {
    position: 'absolute',
    bottom: 0,
    right: 160,
  },
  reply: {
    position: 'absolute',
    bottom: 0,
    right: 100,
  },
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
    width: '85%',
    borderRadius: 20,
    fontSize: 20,
    padding: 10,
  },
  sendComment: {
    position: 'absolute',
    right: 10,
  },
})
