//TaskItem.js
import React, {useState} from 'react';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TouchableOpacity} from 'react-native';

const Container = styled.View`
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  background-color: #fff;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  float: 'right';
`;

const Text = styled.TextInput`
  flex: 1;
  font-size: 16px;
  margin-right: 10px;
  color: black;
  border-bottom-width: ${props => (props.editing ? '1px' : '0px')};
  border-color: #ccc;
`;

const DateText = styled.Text`
  font-size: 14px;
  color: black;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const EditText = styled.Text`
  color: blue;
`;

const EditButton = styled.TouchableOpacity`
  padding: 10px;
  margin-left: 10px;
`;

const Checkbox = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border-width: 1px;
  border-color: #aaa;
  justify-content: center;
  align-items: center;
`;

const DeleteButton = styled.TouchableOpacity`
  padding: 10px;
  margin-left: 10px;
`;

const TaskItem = ({task, onTaskEdit, onTaskDelete}) => {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.text);
  const [done, setDone] = useState(task.done);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleCheck = () => {
    setDone(!done);
    onTaskEdit(task.id, editedTitle, task.date, !done);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = date => {
    const formattedDate = moment(date).format('MMMM D, YYYY h:mm a');
    onTaskEdit(task.id, editedTitle, formattedDate, done);
    hideDatePicker();

    Toast.show({
      type: 'success',
      text1: 'A date has been picked:',
      text2: formattedDate,
      position: 'bottom',
      visibilityTime: 3000,
    });
  };

  const handleEditButtonClick = () => {
    if (editing) {
      onTaskEdit(task.id, editedTitle, task.date, done);
    }
    setEditing(!editing);
  };

  const handleDeleteButtonClick = () => {
    onTaskDelete(task.id);
  };

  return (
    <>
      {editing ? (
        // Edit mode
        <Container>
          <Input value={editedTitle} onChangeText={setEditedTitle} />
          <RowContainer>
            <TouchableOpacity onPress={showDatePicker}>
              <DateText>
                {moment(task.date).format('MMMM D, YYYY h:mm a')}
              </DateText>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
            />
            <ButtonContainer>
              <EditButton onPress={handleEditButtonClick}>
                <EditText>
                  <Icon name="save" size={20} color="black" />
                </EditText>
              </EditButton>
              <DeleteButton onPress={handleDeleteButtonClick}>
                <Icon name="trash-o" size={20} color="black" />
              </DeleteButton>
              <Checkbox onPress={handleCheck}>
                {done && <Icon name="check" size={20} color="green" />}
              </Checkbox>
            </ButtonContainer>
          </RowContainer>
        </Container>
      ) : (
        // View mode
        <Container>
          <Text
            editable={false}
            value={task.text}
            onChangeText={value => setEditedTitle(value)}
          />
          <RowContainer>
            <DateText>
              {moment(task.date).format('MMMM D, YYYY h:mm a')}
            </DateText>

            <ButtonContainer>
              <EditButton onPress={handleEditButtonClick}>
                <EditText>
                  <Icon name="edit" size={20} color="black" />
                </EditText>
              </EditButton>
              <DeleteButton onPress={handleDeleteButtonClick}>
                <Icon name="trash-o" size={20} color="black" />
              </DeleteButton>
              <Checkbox onPress={handleCheck}>
                {done && <Icon name="check" size={20} color="green" />}
              </Checkbox>
            </ButtonContainer>
          </RowContainer>
        </Container>
      )}
    </>
  );
};

export default TaskItem;
