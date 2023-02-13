import PushNotification from "react-native-push-notification";

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

export const LocalNotificationSchedule = (userSchedule) => {
    PushNotification.localNotificationSchedule({
        channelId: 'channel-id',
        channelName: 'my channel',
        autoCancel: true,
        title: 'THÔNG BÁO ĐẾN GIỜ ĐỌC SÁCH',
        message: 'Đã đến giờ đọc sách',
        repeatType: 'day',
        repeatTime: 2,
        date: userSchedule,
        allowWhileIdle: true,
        playSound: true,
        soundName: 'default',
        vibrate: true,
    })
}

export const CancelAllNotification = () => {
    PushNotification.cancelAllLocalNotifications()
}




