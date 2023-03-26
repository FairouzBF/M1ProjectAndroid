//TaskList.js
import React, {useState} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components';
import TaskItem from '../TaskItem';
import moment from 'moment';

const Container = styled.View`
  flex: 1;
`;

const Categories = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
  background-color: #f5f5f5;
`;

const Category = styled.TouchableOpacity`
  padding: 10px 15px;
  border-radius: 20px;
  background-color: ${props => (props.isSelected ? '#4CAF50' : 'white')};
`;

const CategoryText = styled.Text`
  font-size: 16px;
  color: ${props => (props.isSelected ? 'white' : 'black')};
`;

const TaskContainer = styled.View`
  flex: 1;
  padding: 10px;
`;

const TaskList = ({title, tasks, onTaskEdit, onTaskDelete}) => {
  const [selectedCategory, setSelectedCategory] = useState('pending');

  const getTasksByCategory = category => {
    if (category === 'pending') {
      return tasks.filter(
        task => !task.done && moment(task.date).isAfter(moment()),
      );
    } else if (category === 'completed') {
      return tasks.filter(task => task.done);
    } else if (category === 'forgotten') {
      return tasks.filter(
        task => !task.done && moment(task.date).isBefore(moment()),
      );
    }
  };

  const filteredTasks = getTasksByCategory(selectedCategory);

  const renderItem = ({item}) => (
    <TaskItem task={item} onTaskEdit={onTaskEdit} onTaskDelete={onTaskDelete} />
  );

  return (
    <Container>
      <Categories>
        <Category
          isSelected={selectedCategory === 'pending'}
          onPress={() => setSelectedCategory('pending')}>
          <CategoryText>Pending</CategoryText>
        </Category>
        <Category
          isSelected={selectedCategory === 'completed'}
          onPress={() => setSelectedCategory('completed')}>
          <CategoryText>Completed</CategoryText>
        </Category>
        <Category
          isSelected={selectedCategory === 'forgotten'}
          onPress={() => setSelectedCategory('forgotten')}>
          <CategoryText>Forgotten</CategoryText>
        </Category>
      </Categories>
      <TaskContainer>
        <FlatList
          data={filteredTasks}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </TaskContainer>
    </Container>
  );
};

export default TaskList;
