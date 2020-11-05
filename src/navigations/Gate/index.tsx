import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from 'navigations/Auth/index';
import { RootState } from 'store/rootReducer';
import { useSelector } from 'react-redux';

interface IProps {
  childern?: React.ReactNode;
}

const Gate: React.FC<IProps> = () => {
  // const { isLoggedIn } = useSelector((state: RootState) => state.usersSlice);
  return (
    <NavigationContainer>
      <Auth />
    </NavigationContainer>
  );
};

export default Gate;
