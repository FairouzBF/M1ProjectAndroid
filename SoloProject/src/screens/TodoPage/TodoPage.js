//TodoPage.js
import React, {useEffect, useState, useCallback} from 'react';
import {useIsFocused} from '@react-navigation/native';
import styled from 'styled-components/native';
import TaskList from '../../components/TaskList';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scheduleNotification} from '../../services/notificationHelper';

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Form = styled.View`
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  color: black;
`;

const DateButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const DateText = styled.Text`
  font-size: 16px;
  margin-left: 5px;
  color: black;
`;

const AddButton = styled.TouchableOpacity`
  background-color: #007aff;
  padding: 10px;
  border-radius: 4px;
`;

const AddButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const TodoPage = ({navigation}) => {
  // State variables
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [date, setDate] = useState(new Date().toISOString());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const isFocused = useIsFocused();

  // Save and Retrieve Data functions
  const saveData = useCallback(async tasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks to storage');
    }
  }, []);

  const retrieveData = useCallback(async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      } else {
        // Set an empty array if there are no tasks stored
        setTasks([]);
      }
    } catch (e) {
      console.error('Failed to retrieve tasks from storage:', e);
    }
  }, []);

  useEffect(() => {
    retrieveData();
  }, [retrieveData]);

  useEffect(() => {
    if (isFocused) {
      // Perform any required actions when the screen is focused
    }
  }, [isFocused]);

  // Task-related functions
  const onTaskAdd = (text, date) => {
    const newTask = {id: Date.now().toString(), text, date, done: false};
    setTasks([...tasks, newTask]);
    saveData([...tasks, newTask]);
    setText('');
    setDate(moment().toISOString());
    scheduleNotification(newTask);
  };

  const onTaskEdit = (id, text, date, done) => {
    const editedTasks = tasks.map(task =>
      task.id === id ? {...task, text, date, done} : task,
    );
    setTasks(editedTasks);
    saveData(editedTasks);
    scheduleNotification(editedTasks);
  };

  const onTaskDelete = id => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
    saveData(filteredTasks);
  };

  // Date Picker functions
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = pickedDate => {
    setDate(moment(pickedDate).toISOString());
    hideDatePicker();
  };

  const handleSubmit = () => {
    if (text && date) {
      onTaskAdd(text, date);
      setText('');
      setDate(moment().toISOString());
    }
  };

  const handleTaskEdit = (taskId, newText, newDate, newDone) => {
    onTaskEdit(taskId, newText, newDate, newDone);
  };

  return (
    <Container>
      <Form>
        <Input
          placeholder="Describe your task here"
          placeholderTextColor="black"
          value={text}
          onChangeText={value => setText(value)}
        />
        <DateButton onPress={showDatePicker}>
          <Icon name="time" size={20} color="black" />
          <DateText>{moment(date).format('MMMM D, YYYY h:mm a')}</DateText>
        </DateButton>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          minimumDate={new Date(Date.now())}
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
        <AddButton onPress={handleSubmit}>
          <AddButtonText>Add task</AddButtonText>
        </AddButton>
      </Form>
      <TaskList
        tasks={tasks}
        onTaskEdit={handleTaskEdit}
        onTaskDelete={onTaskDelete}
      />
    </Container>
  );
};

export default TodoPage;
