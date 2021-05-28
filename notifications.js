import PushNotification, { Importance } from 'react-native-push-notification';

import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATION_STORAGE_KEY = 'NOTIFICATION_STORAGE_KEY';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification
  },

  // (optional) Called when Registered Action is pressed and
  // invokeApp is false, if true onNotification will be called(Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel(
  {
    channelId: 'study-remainder-channel', // (required)
    channelName: 'Studt Remainders', // (required)
    channelDescription: 'Study Remainder', // (optional) default: undefined.
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

//------------------------------------------------------------------

// export const testNotification = () => {
//   PushNotification.localNotification({
//     channelId: 'study-remainder-channel',
//     title: 'Time to study',
//     message: 'Do not forget to study today!',
//   });
// };

// export const testRemoveAllDeliveredNotifications = () => {
//   PushNotification.removeAllDeliveredNotifications();
// };

export const setNotificationForTomorrow = async () => {
  // register new notification if there's one already.
  const registeredNotification = await getRegisteredNotification();
  if (registeredNotification === null) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(20);
    tomorrow.setMinutes(0);

    PushNotification.localNotificationSchedule({
      channelId: 'study-remainder-channel',
      title: 'Time to study',
      message: 'Do not forget to study today!',
      date: new Date(tomorrow),
      allowWhileIdle: false,
      repeatType: 'day',
    });
    await storeRegisteredNotification();
  }
};

export const cancelAllNotification = async () => {
  PushNotification.cancelAllLocalNotifications();
  await removeRegisteredNotification();
};

export const reschedualeForTomrrow = async () => {
  await cancelAllNotification();
  await setNotificationForTomorrow();
};

//----------------------------------------------------------------
// Local Storage API

const getRegisteredNotification = async () => {
  try {
    const result = await AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY);
    return result !== null ? JSON.parse(result) : null;
  } catch (e) {
    console.error("Can't get registered notification, ", e);
  }
};

const storeRegisteredNotification = async (title) => {
  try {
    await AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(true));
  } catch (e) {
    console.error("Can't store registered notification, ", e);
  }
};

const removeRegisteredNotification = async (title) => {
  try {
    await AsyncStorage.removeItem(NOTIFICATION_STORAGE_KEY);
  } catch (e) {
    console.error("Can't remove registered notification, ", e);
  }
};

//----------------------------------------------------------------
