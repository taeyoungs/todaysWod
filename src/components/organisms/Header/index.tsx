import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import T, { FontFamily } from 'components/atoms/T';
import Icon from 'components/atoms/Icon';
import Block, { FlexDirection, Sort } from 'components/molecules/Block';
import { ColorPalette } from 'models/color';

interface IProps {
  goMembership(): void;
  title: string;
  iconName: string;
  back?: boolean;
}

const Header: React.FC<IProps> = ({
  goMembership,
  title,
  iconName,
  back = false,
}) => {
  const statusBarHeight = getStatusBarHeight();

  return (
    <Block
      width={'100%'}
      height={`${statusBarHeight + 50}px`}
      backgroundColor={ColorPalette.Main.BG}
      flexDirection={FlexDirection.ROW}
      sort={Sort.SPACE_BETWEEN_BOTTOM}
    >
      <Block width={'50px'}>
        {back && <Icon name="arrow-back" color={ColorPalette.White.WHITE} />}
      </Block>
      <Block margin={[5, 12, 10, 0]} flexDirection={FlexDirection.ROW}>
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
      <Block
        margin={[10, 15, 11, 0]}
        padding={[3, 5]}
        borderRadius={[3]}
        border={[1]}
        borderColor={ColorPalette.White.WHITE}
      >
        <TouchableWithoutFeedback onPress={goMembership}>
          <T size={10} color={ColorPalette.White.WHITE}>
            회원권
          </T>
        </TouchableWithoutFeedback>
      </Block>
    </Block>
  );
};

export default Header;
