import React, {useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import {Animated} from 'react-native';
import SplashScreenLogo from '../../../assest/logo-todo-list.png';

const StyledAnimatedImage = styled(Animated.Image)`
  width: 100px;
  height: 100px;
`;

const Index = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(animate);
    };

    animate();
  }, [opacity]);

  return <StyledAnimatedImage source={SplashScreenLogo} style={{opacity}} />;
};

export default Index;
