import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Dimensions, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import T, { FontFamily, TextAlign } from 'components/atoms/T';
import Btn from 'components/atoms/Button';
import Flex from 'components/molecules/Flex';
import Block from 'components/molecules/Block';
import PositionBlock, { Position } from 'components/molecules/PositionBlock';
import OpacityHeader from 'components/organisms/OpacityHeader';
import InfoItem from 'components/organisms/InfoItem';
import useUser from 'hooks/useUser';
import useUserActions from 'hooks/useUserActions';
import { HomeScreenProps } from 'models/types';
import { ColorPalette } from 'models/color';
import { createTwoButtonAlert } from 'utils';
import api from 'api';

const { width } = Dimensions.get('screen');

interface IProps {
  navigation: HomeScreenProps['navigation'];
}

const PersonalInfo: React.FC<IProps> = ({ navigation }) => {
  const { user, userId, token } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const { onSetUser } = useUserActions();

  const updateInfo = async () => {
    try {
      const form = {
        last_name: name,
        email,
        gender,
      };
      await api.updateUser(form, userId, token).then((res) => {
        onSetUser(res.data);
      });
      navigation.goBack();
    } catch (error) {
      console.warn(error);
    }
  };

  const handleUpdate = () => {
    if (isChanged) {
      createTwoButtonAlert(
        updateInfo,
        '저장되지 않은 변경사항',
        '개인 정보의 변경사항을 저장하시겠어요?',
        '취소',
        '저장'
      );
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.last_name);
      setEmail(user.email);
      setGender(user.gender);
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: ({ scene }) => (
        <OpacityHeader
          title="개인 정보"
          iconName="person"
          scene={scene}
          back={handleUpdate}
          updateInfo={updateInfo}
        />
      ),
    });
  }, [isChanged]);

  return (
    <Flex backgroundColor={ColorPalette.White.WHITE} width={`${width}px`}>
      <InfoItem
        label="이름"
        setConfirmVisible={setConfirmVisible}
        value={name}
        setValue={setName}
        setIsChanged={setIsChanged}
      />
      <InfoItem
        label="이메일"
        setConfirmVisible={setConfirmVisible}
        value={email}
        setValue={setEmail}
        setIsChanged={setIsChanged}
      />
      <InfoItem
        label="성별"
        setConfirmVisible={setConfirmVisible}
        setPickerVisible={setPickerVisible}
        value={gender}
        setValue={setGender}
        pickerVisible={pickerVisible}
        setIsChanged={setIsChanged}
      />
      <Modal isVisible={pickerVisible} hasBackdrop={false} coverScreen={false}>
        <PositionBlock position={Position.ABSOLUTE} left={-20} bottom={-20}>
          <Picker
            style={{
              width: width,
              height: 216,
              borderTopWidth: 1,
              borderTopColor: ColorPalette.Main.BG,
              backgroundColor: ColorPalette.White.WHITE,
            }}
            itemStyle={{
              color: ColorPalette.Main.BG_DARK,
              fontFamily: FontFamily.NANUM_REGULAR,
              fontSize: 18,
            }}
            selectedValue={gender}
            onValueChange={(value) => {
              setGender(value.toString());
              setIsChanged(true);
            }}
          >
            <Picker.Item label="선택하지 않음" value="unselected" />
            <Picker.Item label="남성" value="male" />
            <Picker.Item label="여성" value="female" />
          </Picker>
        </PositionBlock>
      </Modal>
      <Modal isVisible={confirmVisible} hasBackdrop={false} coverScreen={false}>
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
                setPickerVisible(false);
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
    </Flex>
  );
};

export default PersonalInfo;
