import React, { useState } from 'react';
import LogIn from 'components/templates/LogIn';

const LogInScreen = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const onEmailChange = (text: string) => setEmail(text);
  const onPwChange = (text: string) => setPw(text);
  const onPress = (event: GestureResponderEvent) => {
    console.log(email, pw);
  };
  return (
    <LogIn
      email={email}
      onEmailChange={onEmailChange}
      pw={pw}
      onPwChange={onPwChange}
      onPress={onPress}
    />
  );
};

export default LogInScreen;
