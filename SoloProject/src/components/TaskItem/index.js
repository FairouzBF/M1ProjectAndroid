import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components';

const TaskItemWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const TaskItemCheckbox = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border-width: 2px;
  border-color: ${({theme}) => theme.colors.primary};
  margin-right: 10px;
  justify-content: center;
  align-items: center;
`;

const TaskItemText = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.colors.text};
`;

const TaskItem = ({task, onToggle}) => {
  return (
    <TouchableOpacity onPress={() => onToggle(task.id)}>
      <TaskItemWrapper>
        <TaskItemCheckbox>
          {task.completed && (
            <Text style={{color: theme.colors.primary}}>✓</Text>
          )}
        </TaskItemCheckbox>
        <TaskItemText>{task.title}</TaskItemText>
      </TaskItemWrapper>
    </TouchableOpacity>
  );
};

export default TaskItem;
