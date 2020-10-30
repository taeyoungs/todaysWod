import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { IComponentProps } from 'models/common';
import T from 'components/atoms/T';
import Block from 'components/molecules/Block';
import Btn from 'components/atoms/Button';
import Scroll from 'components/molecules/Scroll';

type IProps = IComponentProps;

const TestTemplate: React.FC<IProps> = () => {
  const handleTestBtn = (event: GestureResponderEvent): void => {
    console.log('클릭');
  };

  return (
    <Scroll>
      <T>뭔가 이상한듯</T>
      <Btn onPress={handleTestBtn}>
        <T margin={[40, 40, 40, 40]}>여기 클릭</T>
      </Btn>
    </Scroll>
  );
};

export default TestTemplate;
