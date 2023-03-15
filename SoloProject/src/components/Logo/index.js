import React from 'react';
import {Image} from 'react-native';

const Index = () => {
  return (
    <Image
      source={require('../../../assets/logo-todo-list.png')}
      style={{
        width: 200,
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  );
};

export default Index;
