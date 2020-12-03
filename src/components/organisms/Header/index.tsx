import React from 'react';
import Block, { FlexDirection, Sort } from 'components/molecules/Block';
import Btn from 'components/atoms/Button';
import Img from 'components/atoms/Img';
import { ColorPalette } from 'models/color';
import T, { FontFamily } from 'components/atoms/T';
import Icon from 'components/atoms/Icon';

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
  return (
    <Block
      width={'100%'}
      height={'65px'}
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
      <Block margin={[10, 15, 10, 0]}>
        <Btn onPress={goMembership}>
          <Img
            sourceImg={require('assets/images/ticket.png')}
            width={23}
            height={23}
          />
        </Btn>
      </Block>
    </Block>
  );
};

export default Header;
