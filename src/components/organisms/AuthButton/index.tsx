import Btn from 'components/atoms/Button';
import T, { FontFamily, TextAlign } from 'components/atoms/T';
import Block from 'components/molecules/Block';
import { ColorPalette } from 'models/color';
import React from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

interface IProps {
  onPress: () => Promise<void>;
  loading: boolean;
  big?: boolean;
  text: string;
}

const AuthButton: React.FC<IProps> = ({
  onPress,
  loading,
  big = false,
  text,
}) => {
  return (
    <Block width={`${width - 40}px`} margin={[0, 20]}>
      <Btn
        onPress={onPress}
        activeOpacity={0.6}
        padding={big ? [20] : [15, 20]}
        margin={[20, 0]}
        backgroundColor={ColorPalette.Main.TXT}
        borderRadius={big ? 50 : 25}
      >
        {loading ? (
          <ActivityIndicator color={ColorPalette.Main.BG_DARK} />
        ) : (
          <T
            color={ColorPalette.Main.BG}
            fontFamily={FontFamily.NANUM_BOLD}
            align={TextAlign.CENTER}
            size={16}
          >
            {text}
          </T>
        )}
      </Btn>
    </Block>
  );
};

export default AuthButton;
