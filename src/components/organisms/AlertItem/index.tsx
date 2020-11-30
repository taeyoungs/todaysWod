import React, { useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'components/atoms/Icon';
import T, { FontFamily } from 'components/atoms/T';
import Block, { FlexDirection, Sort } from 'components/molecules/Block';
import Shadow from 'components/molecules/Shadow';
import { ColorPalette } from 'models/color';
import { IAlertProps } from 'models/common';
import { dayOfTheWeek } from 'utils';

const { width } = Dimensions.get('screen');

interface IProps {
  alert: IAlertProps;
}

const AlertItem: React.FC<IProps> = ({ alert }) => {
  const [more, setMore] = useState(false);
  // console.log(alerts);

  const handleMore = () => {
    setMore((prevState) => !prevState);
  };

  function iconName(alertType: string): Array<string> {
    if (alertType === 'notice') {
      return ['megaphone', '공지사항', ColorPalette.Main.BG_DARK];
    } else if (alertType === 'event') {
      return ['gift', '이벤트', ColorPalette.Main.TXT];
    } else {
      return ['text', '메세지', ColorPalette.Red.RED];
    }
  }

  function formatDate(datetime: string): string {
    const now = new Date();
    const date = new Date(datetime);
    if (now.getDate() === date.getDate()) {
      const m =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      return `${h}:${m}`;
    } else {
      const d = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      return `${date.getDate()}  ${dayOfTheWeek(d)}`;
    }
  }

  return (
    <TouchableOpacity onPress={handleMore}>
      <Shadow>
        <Block
          backgroundColor={ColorPalette.White.WHITE}
          width={`${width - 40}px`}
          height={more ? '150px' : '100px'}
          flexDirection={FlexDirection.ROW}
          padding={[0, 15]}
          sort={Sort.SPACE_BETWEEN_CENTER}
          margin={[0, 0, 5, 0]}
        >
          <Block sort={Sort.LEFT_CENTER}>
            <Block margin={[5]} flexDirection={FlexDirection.ROW}>
              <Icon
                name={iconName(alert.alert_type)[0]}
                size={16}
                color={iconName(alert.alert_type)[2]}
              />
              <T
                size={12}
                margin={[0, 10]}
                fontFamily={FontFamily.NANUM_BOLD}
                color={iconName(alert.alert_type)[2]}
              >
                {iconName(alert.alert_type)[1]}
              </T>
            </Block>
            <T size={13} margin={[5, 0, 10, 0]}>
              {alert.title}
            </T>
            <Block sort={Sort.LEFT_CENTER}>
              <T size={12} color={ColorPalette.Gray.GRAY} lineHeight={16}>
                {more
                  ? alert.content
                  : alert.content.length > 24
                  ? `${alert.content.slice(0, 25)}...`
                  : alert.content}
              </T>
            </Block>
          </Block>
          {!more && (
            <Block>
              <T
                color={ColorPalette.Main.BG}
                fontFamily={FontFamily.NANUM_BOLD}
                size={15}
              >
                {formatDate(alert.datetime)}
              </T>
            </Block>
          )}
        </Block>
      </Shadow>
    </TouchableOpacity>
  );
};

export default AlertItem;
