import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'components/atoms/Icon';
import Btn from 'components/atoms/Button';
import PositionBlock, { Position } from 'components/molecules/PositionBlock';
import { SignUpScreenProps } from 'models/types';
import { ColorPalette } from 'models/color';

interface IProps {}

const BackButton: React.FC<IProps> = () => {
  const naviagtion = useNavigation<SignUpScreenProps['navigation']>();
  return (
    <PositionBlock position={Position.ABSOLUTE} top={30} left={30}>
      <Btn onPress={() => naviagtion.goBack()}>
        <Icon
          name="arrow-dropdown-circle"
          color={ColorPalette.Main.TXT}
          size={30}
        />
      </Btn>
    </PositionBlock>
  );
};

export default BackButton;
