import PushNotification from "react-native-push-notification";

export const RemoteNotification = () => {
    PushNotification.configure({
        onRegister: function (token) {
            //console.log('Token', token)
        },

        onNotification: function (notification) {
            //console.log('Remote notification: ', notification)
        },

        senderID: '452275898258',
        popInitialNotification: true,
        requestPermissions: true,
    })
    return null
}