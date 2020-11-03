import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from 'navigations/Auth/index';

interface IProps {
  childern?: React.ReactNode;
}

const Gate: React.FC<IProps> = () => {
  return (
    <NavigationContainer>
      <Auth />
    </NavigationContainer>
  );
};

export default Gate;
