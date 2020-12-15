import React, { useRef, useState } from 'react';
import { Dimensions, TextInput, TouchableOpacity } from 'react-native';
import T, { FontFamily } from 'components/atoms/T';
import Block, { FlexDirection, Sort } from 'components/molecules/Block';
import { ColorPalette } from 'models/color';
import Icon from 'components/atoms/Icon';

const { width } = Dimensions.get('screen');

interface IProps {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setConfirmVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  size?: number;
  secureTextEntry?: boolean;
}

const AuthItem: React.FC<IProps> = ({
  label,
  value,
  setValue,
  setConfirmVisible,
  name,
  size = 20,
  secureTextEntry = false,
}) => {
  const [press, setPress] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const tRef = useRef<TextInput>(null);
  const handleTouch = () => {
    tRef.current?.focus();
    setIsPress(true);
  };

  return (
    <TouchableOpacity
      onPress={handleTouch}
      activeOpacity={1}
      style={{
        width: width,
        height: 105,
        backgroundColor: press
          ? ColorPalette.Main.BG_DARK
          : ColorPalette.Main.BG,
        paddingHorizontal: 20,
        marginBottom: 10,
      }}
      onPressIn={() => setPress(true)}
      onPressOut={() => setPress(false)}
    >
      <T
        size={12}
        color={isPress ? ColorPalette.Main.TXT : ColorPalette.Main.TXT_LIGHT}
        margin={[10]}
      >
        {label}
      </T>
      <Block
        width={'100%'}
        flexDirection={FlexDirection.ROW}
        border={[1]}
        borderColor={
          isPress ? ColorPalette.Main.TXT : ColorPalette.Main.TXT_LIGHT
        }
        borderRadius={[5]}
        sort={Sort.LEFT_CENTER}
        height={'70px'}
        padding={[0, 5, 0, 0]}
      >
        <Block
          padding={[15, 10, 15, 15]}
          margin={name === 'lock' ? [0, 10, 0, 2] : [0, 10, 0, 0]}
        >
          <Icon
            name={name}
            color={
              isPress ? ColorPalette.Main.TXT : ColorPalette.Main.TXT_LIGHT
            }
            size={size}
          />
        </Block>
        <Block width={'100%'} sort={Sort.LEFT_CENTER}>
          <Block
            width={'100%'}
            flexDirection={FlexDirection.ROW}
            sort={Sort.LEFT_CENTER}
          >
            <TextInput
              style={{
                color: ColorPalette.Main.TXT,
                fontSize: 16,
                width: '80%',
                fontFamily: FontFamily.NANUM_REGULAR,
              }}
              clearButtonMode="always"
              ref={tRef}
              value={value}
              onChangeText={(text) => setValue(text)}
              selectionColor={ColorPalette.Main.TXT}
              autoCapitalize="none"
              secureTextEntry={secureTextEntry}
              editable={true}
              onBlur={() => setIsPress(false)}
              onFocus={() => {
                setIsPress(true);
                setConfirmVisible && setConfirmVisible(true);
              }}
              spellCheck={false}
            />
          </Block>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

export default AuthItem;
