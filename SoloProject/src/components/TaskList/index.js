import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components';
import TaskItem from '../TaskItem';

const TaskListWrapper = styled.View`
  flex: 1;
  padding: 20px;
`;

const TaskList = ({tasks, onToggle}) => {
  const renderItem = ({item}) => {
    return <TaskItem task={item} onToggle={onToggle} />;
  };

  return (
    <TaskListWrapper>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </TaskListWrapper>
  );
};

export default TaskList;
