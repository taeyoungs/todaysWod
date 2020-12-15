import React from 'react';
import { Dimensions, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import Btn from 'components/atoms/Button';
import T, { TextAlign } from 'components/atoms/T';
import Block from 'components/molecules/Block';
import PositionBlock, { Position } from 'components/molecules/PositionBlock';
import { ColorPalette } from 'models/color';

const { width } = Dimensions.get('screen');

interface IProps {
  isVisible: boolean;
  setConfirmVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setPickerVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalConfirm: React.FC<IProps> = ({
  isVisible,
  setConfirmVisible,
  setPickerVisible,
}) => {
  return (
    <Modal isVisible={isVisible} hasBackdrop={false} coverScreen={false}>
      <PositionBlock position={Position.ABSOLUTE} left={-20} bottom={196}>
        <Block
          width={`${width}px`}
          border={[1, 0, 0, 0]}
          borderColor={ColorPalette.Main.BG}
          backgroundColor={ColorPalette.White.WHITE}
          height={'50px'}
        >
          <Btn
            onPress={() => {
              setConfirmVisible(false);
              setPickerVisible && setPickerVisible(false);
              Keyboard.dismiss();
            }}
            padding={[5, 20]}
          >
            <T align={TextAlign.RIGHT} color={ColorPalette.Main.BG_DARK}>
              완료
            </T>
          </Btn>
        </Block>
      </PositionBlock>
    </Modal>
  );
};

export default ModalConfirm;
