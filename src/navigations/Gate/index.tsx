import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from 'navigations/Auth/index';
import useUser from '../../hooks/useUser';

interface IProps {
  childern?: React.ReactNode;
}

const Gate: React.FC<IProps> = () => {
  const { isLoggedIn, boxId } = useUser();
  return (
    <NavigationContainer>
      <Auth />
    </NavigationContainer>
  );
};

export default Gate;
