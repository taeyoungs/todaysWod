import React, { useLayoutEffect } from 'react';
import { Dimensions, TouchableWithoutFeedback, View } from 'react-native';
import T, { TextAlign } from 'components/atoms/T';
import Btn from 'components/atoms/Button';
import Block from 'components/molecules/Block';
import WodList from 'components/organisms/WodList';
import useWod from 'hooks/useWod';
import { ColorPalette } from 'models/color';
import { WodScreenProps } from 'models/types';
import Transparent from 'components/molecules/Transparent';

interface IProps {
  navigation: WodScreenProps['navigation'];
  route: WodScreenProps['route'];
}

const { width } = Dimensions.get('screen');

const Wod: React.FC<IProps> = ({ navigation, route }) => {
  const w = useWod(route.params.date);
  useLayoutEffect(() => {
    navigation.setOptions({
      cardStyle: { backgroundColor: 'transparent' },
      cardOverlayEnabled: true,
    });
  }, []);

  const back = () => navigation.goBack();
  return (
    <Transparent back={back}>
      <Block margin={[80, 20, 0, 20]} width={`${width - 40}px`}>
        {w && w.map((wod) => <WodList wod={wod} key={wod.id} />)}
        <Btn onPress={back}>
          <T
            margin={[25, 0, 0, 0]}
            align={TextAlign.CENTER}
            color={ColorPalette.White.WHITE}
          >
            뒤로 가기
          </T>
        </Btn>
      </Block>
    </Transparent>
  );
};

export default Wod;
