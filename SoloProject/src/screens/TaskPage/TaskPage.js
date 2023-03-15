import React, {useEffect, useState} from 'react';
import {
  Button,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import styled from 'styled-components/native';
import PushNotification from 'react-native-push-notification';
import TaskList from '../../components/TaskList';

const TaskPage = () => {
  //function to handle the input for the task name:
  const [task, setTask] = useState('');

  const handleTaskChange = text => {
    setTask(text);
  };

  //function to handle the date and time picker:
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [taskDate, setTaskDate] = useState(
    moment().format('MMMM Do YYYY, h:mm a'),
  );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = date => {
    setTaskDate(moment(date).format('MMMM Do YYYY, h:mm a'));
    hideDatePicker();
  };

  //function to add a task:
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task === '') {
      return;
    }

    setTasks([
      ...tasks,
      {id: uuid.v4(), name: task, date: taskDate, isDone: false},
    ]);
    setTask('');
  };

  //function to mark a task as done:
  const markAsDone = index => {
    const newTasks = [...tasks];
    newTasks[index].isDone = !newTasks[index].isDone;
    setTasks(newTasks);

    if (newTasks[index].isDone) {
      PushNotification.localNotification({
        message: `Task "${newTasks[index].name}" has been marked as done.`,
        title: 'Task Reminder',
      });
    }
  };

  //function to remove a task:
  const removeTask = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  //function to check if a task's due date and time has been reached:
  useEffect(() => {
    tasks.forEach(task => {
      if (
        !task.isDone &&
        moment().isAfter(moment(task.date, 'MMMM Do YYYY, h:mm a'))
      ) {
        PushNotification.localNotification({
          message: `Task "${task.name}" is due.`,
          title: 'Task Reminder',
        });
      }
    });
  }, [tasks]);

  return (
    <View>
      <TaskInput value={task} onChangeText={handleTaskChange} />
      <TouchableOpacity onPress={showDatePicker}>
        <TaskDate>{taskDate}</TaskDate>
      </TouchableOpacity>
      <AddButton onPress={addTask}>
        <AddButtonText>Add Task</AddButtonText>
      </AddButton>
    </View>
  );
};

//styled component for your task input:
const TaskInput = styled.TextInput`
  height: 40px;
  border-color: gray;
  border-width: 1px;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
`;

//styled component for your add task button:
const AddButton = styled.TouchableOpacity`
  background-color: blue;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  margin-top: 10px;
`;

const AddButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

//styled component for your task item:
const TaskItem = styled.View`
  background-color: #f9c2ff;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TaskText = styled.Text`
  font-size: 16px;
`;

const TaskDate = styled.Text`
  font-size: 14px;
  color: gray;
`;

export default TaskPage;
