import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import BlinkingLogo from '../../components/BlinkingLogo';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #f5fcff;
`;

const LoadingScreen = ({navigation}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.navigate('TodoPage');
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [navigation]);

  return (
    <Container>
      <BlinkingLogo />
    </Container>
  );
};

export default LoadingScreen;
