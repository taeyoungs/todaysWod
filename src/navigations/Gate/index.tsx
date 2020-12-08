import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Box from 'navigations/Box';
import Auth from 'navigations/Auth';
import Main from 'navigations/Main';
import useUser from 'hooks/useUser';

interface IProps {
  childern?: React.ReactNode;
}

const Gate: React.FC<IProps> = () => {
  const { isLoggedIn, user } = useUser();
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        user?.registration_state === 'registered' ? (
          <Main />
        ) : (
          <Box />
        )
      ) : (
        <Auth />
      )}
    </NavigationContainer>
  );
};

export default Gate;
