//LOCAL NOTIFICATION
import PushNotification from "react-native-push-notification";
import { Platform } from "react-native";

PushNotification.configure({
    onNotification: function (notification) {
        console.log('Local Notification', notification)
    },

    popInitialNotification: true,
    requestPermissions: true,
})

export const createChannel = () => {
    PushNotification.createChannel(
        {
            channelId: 'channel-id',
            channelName: 'my channel',
            channelDescription: 'A channel for notification',
            playSound: true,
            soundName: 'default',
            vibrate: true,
        },
    )
}

export const LocalNotification = () => {
    PushNotification.localNotification({
        channelId: 'channel-id',
        channelName: 'my channel',
        autoCancel: true,
        bigText: 'This is local notification demo',
        subText: 'Local notification demo',
        title: 'Local Notification title',
        message: 'Local notification message',
        playSound: true,
        soundName: 'default',
        vibrate: true,
    })
}

//*************************************** */


