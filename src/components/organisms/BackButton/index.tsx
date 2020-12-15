import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'components/atoms/Icon';
import Btn from 'components/atoms/Button';
import PositionBlock, { Position } from 'components/molecules/PositionBlock';
import { SignUpScreenProps } from 'models/types';
import { ColorPalette } from 'models/color';

interface IProps {
  isWhite?: boolean;
}

const BackButton: React.FC<IProps> = ({ isWhite = false }) => {
  const naviagtion = useNavigation<SignUpScreenProps['navigation']>();
  return (
    <PositionBlock position={Position.ABSOLUTE} top={40} left={20}>
      <Btn onPress={() => naviagtion.goBack()} padding={[10]}>
        {isWhite ? (
          <Icon name="arrow-down" color={ColorPalette.Main.BG} size={30} />
        ) : (
          <Icon
            name="arrow-dropdown-circle"
            color={ColorPalette.Main.TXT}
            size={30}
          />
        )}
      </Btn>
    </PositionBlock>
  );
};

export default BackButton;
