//notificationHelper.js
import notifee, {EventType} from '@notifee/react-native';

let globalNavigationRef = null; // Add this line

export function setNavigationRef(navigationRef) {
  globalNavigationRef = navigationRef;
}

export async function scheduleNotification(task) {
  try {
    const taskId = task.id;
    const notificationTime = new Date(task.date).getTime() - 2 * 60 * 1000; // 2 minutes before the task

    console.log('Task date:', task.date);
    console.log('Notification time:', new Date(notificationTime));
    console.log('Current time:', new Date());

    const currentTime = new Date().getTime();
    if (notificationTime > currentTime) {
      await notifee.displayNotification({
        id: taskId,
        title: 'You have some unfinished tasks to do',
        body: task.text,
        android: {
          channelId: 'reminder',
        },
        trigger: {
          type: 'timestamp',
          timestamp: notificationTime,
        },
      });
    } else {
      console.log('Notification time is in the past, not scheduling.');
    } /*
    await notifee.displayNotification({
      id: taskId,
      title: 'You have some unfinished tasks to do',
      body: task.text,
      android: {
        channelId: 'reminder',
      },
      trigger: {
        type: 'timestamp',
        timestamp: notificationTime,
      },
    }); */
  } catch (error) {
    console.error('Error in scheduleNotification:', error);
  }
}

export async function createNotificationChannel() {
  await notifee.createChannel({
    id: 'reminder',
    name: 'Task Reminder',
    vibration: true,
    lights: true,
    sound: 'default',
  });
}

export async function onBackgroundEvent({type, detail}) {
  if (type === EventType.PRESS) {
    console.log('Notification pressed in background', detail.notification);
    // You can do other actions here or navigate to the desired screen in the app
    globalNavigationRef.current?.navigate('TodoPage');
  }
}
