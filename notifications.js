import PushNotification, { Importance } from 'react-native-push-notification';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
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

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  // requestPermissions: true,
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

export const testNotification = () => {
  PushNotification.localNotification({
    channelId: 'study-remainder-channel',
    title: 'My Notification Title',
    message: 'My Notification Message',
  });
};

export const testSchedualledNotification = () => {
  PushNotification.localNotificationSchedule({
    channelId: 'study-remainder-channel',
    message: 'My Schedualled Notification Message',
    date: new Date(Date.now() + 15 * 1000),
    allowWhileIdle: false,
  });
};

export const testCancelAllNotification = () => {
  PushNotification.cancelAllLocalNotifications();
};

export const testRemoveAllDeliveredNotifications = () => {
  PushNotification.removeAllDeliveredNotifications();
};
