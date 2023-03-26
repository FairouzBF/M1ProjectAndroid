// backgroundFetch.js
import BackgroundFetch from 'react-native-background-fetch';
import {scheduleNotification} from './notificationHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get tasks from AsyncStorage
async function getTasksFromStorage() {
  try {
    const tasksJson = await AsyncStorage.getItem('tasks');
    return tasksJson ? JSON.parse(tasksJson) : [];
  } catch (error) {
    console.error(
      '[BackgroundFetch] Error retrieving tasks from AsyncStorage:',
      error,
    );
    return [];
  }
}

function isTaskPending(task) {
  return task.status === 'pending';
}

async function onBackgroundFetchEvent(taskId) {
  console.log('[BackgroundFetch] taskId: ', taskId);
  const tasks = await getTasksFromStorage();
  tasks.forEach(task => {
    if (isTaskPending(task)) {
      scheduleNotification(task);
    }
  });

  // Finish the background task
  BackgroundFetch.finish(taskId);
}

export async function configureBackgroundFetch() {
  // Configure BackgroundFetch.
  const status = await BackgroundFetch.configure(
    {
      minimumFetchInterval: 15, // Fetch interval in minutes
      stopOnTerminate: false,
      startOnBoot: true,
      enableHeadless: true,
    },
    onBackgroundFetchEvent,
    error => {
      console.log('[BackgroundFetch] configure error: ', error);
    },
  );

  console.log('[BackgroundFetch] configure status: ', status);
}
