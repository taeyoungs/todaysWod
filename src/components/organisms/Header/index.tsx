import React from 'react';
import Block, { Sort } from 'components/molecules/Block';
import Btn from 'components/atoms/Button';
import Img from 'components/atoms/Img';
import { ColorPalette } from 'models/color';

interface IProps {
  goMembership(): void;
}

const Header: React.FC<IProps> = ({ goMembership }) => {
  return (
    <Block
      width={'100%'}
      height={'60px'}
      backgroundColor={ColorPalette.Main.BG}
      sort={Sort.RIGHT_BOTTOM}
    >
      <Block margin={[0, 25, 10, 0]}>
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
