import React, { useRef, useState } from 'react';
import { Dimensions, TextInput, TouchableOpacity } from 'react-native';
import T, { FontFamily } from 'components/atoms/T';
import Block, { Sort } from 'components/molecules/Block';
import { ColorPalette } from 'models/color';

const { width } = Dimensions.get('screen');

interface IProps {
  label: string;
  setConfirmVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setPickerVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  pickerVisible?: boolean;
}

const InfoItem: React.FC<IProps> = ({
  label,
  setConfirmVisible,
  setPickerVisible,
  setIsChanged,
  value,
  setValue,
  pickerVisible,
}) => {
  const [press, setPress] = useState(false);
  const tRef = useRef<TextInput>(null);
  const handleTouch = () => {
    if (setPickerVisible) {
      setConfirmVisible(true);
      setPickerVisible(true);
    } else {
      tRef.current?.focus();
      setConfirmVisible(true);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleTouch}
      activeOpacity={1}
      style={{
        width: width,
        height: 90,
        backgroundColor: press
          ? ColorPalette.White.SMOKE
          : ColorPalette.White.TANSPARENT,
        paddingHorizontal: 20,
        marginBottom: pickerVisible ? 120 : 10,
      }}
      onPressIn={() => setPress(true)}
      onPressOut={() => setPress(false)}
    >
      <Block
        height={'90px'}
        border={[0, 0, 1, 0]}
        borderColor={ColorPalette.Gray.GAINSBORO}
        sort={Sort.LEFT_TOP}
      >
        <T margin={[10, 0, 15, 0]} color={ColorPalette.Gray.GRAY} size={13}>
          {label}
        </T>
        {setPickerVisible ? (
          <T size={18}>
            {value === 'unselected'
              ? '선택하지 않음'
              : value === 'male'
              ? '남성'
              : '여성'}
          </T>
        ) : (
          <TextInput
            style={{
              color: ColorPalette.Black.BLACK,
              fontSize: 18,
              width: '80%',
              fontFamily: FontFamily.NANUM_REGULAR,
            }}
            ref={tRef}
            value={value}
            onChangeText={(text) => {
              setValue(text);
              setIsChanged(true);
            }}
            selectionColor={ColorPalette.Main.BG_DARK}
            onFocus={() => setConfirmVisible(true)}
          />
        )}
      </Block>
    </TouchableOpacity>
  );
};

export default InfoItem;
