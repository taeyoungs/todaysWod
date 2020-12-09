import React from 'react';
import { Animated } from 'react-native';
import { Scene } from '@react-navigation/stack/lib/typescript/src/types';
import { Route } from '@react-navigation/native';
import styled from 'styled-components/native';
import Icon from 'components/atoms/Icon';
import T, { FontFamily } from 'components/atoms/T';
import { ColorPalette } from 'models/color';
import Block, { FlexDirection } from 'components/molecules/Block';
import Btn from 'components/atoms/Button';

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${ColorPalette.Main.BG};
  height: 65px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  padding-top: 30px;
`;

const BackButton = styled.TouchableOpacity`
  padding: 5px;
`;

interface IProps {
  scene: Scene<Route<string, object | undefined>>;
  back: () => void;
  title: string;
  iconName: string;
  updateInfo?: () => Promise<void>;
}

const OpacityHeader: React.FC<IProps> = ({
  scene,
  back,
  title,
  iconName,
  updateInfo,
}) => {
  //   console.log(scene.progress);
  const progress = Animated.add(
    scene.progress.current,
    scene.progress.next || 0
  );

  const opacity = progress.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return (
    <Animated.View style={{ opacity }}>
      <Container>
        <BackButton onPress={back}>
          <Icon name="arrow-back" color={ColorPalette.White.WHITE} />
        </BackButton>
        <Block flexDirection={FlexDirection.ROW}>
          <Icon name={iconName} color={ColorPalette.White.WHITE} size={18} />
          <T
            color={ColorPalette.White.WHITE}
            size={16}
            fontFamily={FontFamily.NANUM_BOLD}
            margin={[0, 0, 0, 10]}
          >
            {title}
          </T>
        </Block>
        {updateInfo ? (
          <Block>
            <Btn onPress={updateInfo} padding={[10]}>
              <T color={ColorPalette.White.WHITE}>저장</T>
            </Btn>
          </Block>
        ) : (
          <Block width={'20px'}></Block>
        )}
      </Container>
    </Animated.View>
  );
};

export default OpacityHeader;
