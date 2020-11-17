import Btn from 'components/atoms/Button';
import T, { FontFamily, TextAlign } from 'components/atoms/T';
import Block from 'components/molecules/Block';
import { ColorPalette } from 'models/color';
import { IWodProps } from 'models/common';
import React from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { dayOfTheWeek } from 'utils';

interface IProps {
  svRef: React.RefObject<ScrollView>;
  wodRef: React.RefObject<ScrollView>;
  wod: IWodProps;
  idx: number;
  today: number;
  offsetX: number;
  currentIndex: number;
  offsetWodX: number;
  setOffsetWodX: React.Dispatch<React.SetStateAction<number>>;
  setToday: React.Dispatch<React.SetStateAction<number>>;
  setOffsetX: React.Dispatch<React.SetStateAction<number>>;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const { width } = Dimensions.get('screen');

const DayButton: React.FC<IProps> = ({
  svRef,
  wodRef,
  wod,
  idx,
  today,
  offsetX,
  currentIndex,
  offsetWodX,
  setOffsetWodX,
  setToday,
  setOffsetX,
  setCurrentIndex,
}) => {
  const day = parseInt(wod?.date.split('-')[2], 10);
  const handlePress = () => {
    // console.log(
    //   `idx: ${idx} today: ${today} day: ${day} currentIndex: ${currentIndex}`
    // );
    // ToDo: 끝에 도달했을 때 그리고 처음에 도달했을 때 테스트
    if (today - day === 0) {
      console.log('click today');
      return;
    }
    // iphone 7 기준 (width 375)
    const toX =
      idx - currentIndex > 0
        ? offsetX + (idx - currentIndex) * 67
        : offsetX - Math.abs(idx - currentIndex) * 67;
    const toWodX =
      idx - currentIndex > 0
        ? offsetWodX + (idx - currentIndex) * width
        : offsetWodX - Math.abs(idx - currentIndex) * width;
    setOffsetX(toX);
    setOffsetWodX(toWodX);
    svRef.current?.scrollTo({ x: toX, y: 0, animated: true });
    wodRef.current?.scrollTo({ x: toWodX, y: 0, animated: true });
    setCurrentIndex(idx);
    setToday(day);
  };

  return (
    <Block
      width={`${width / 6 - 5.5}px`}
      backgroundColor={
        today - day === 0 ? ColorPalette.Main.BG_DARK : ColorPalette.Main.BG
      }
      border={[1]}
      borderColor={
        today - day === 0 ? ColorPalette.Main.BG_DARK : ColorPalette.White.WHITE
      }
      borderRadius={[10]}
      margin={[0, 10, 0, 0]}
    >
      <Btn onPress={handlePress}>
        <Block>
          <T
            color={
              today - day === 0
                ? ColorPalette.Main.TXT
                : ColorPalette.White.WHITE
            }
            align={TextAlign.CENTER}
            fontFamily={
              today - day === 0
                ? FontFamily.NANUM_BOLD
                : FontFamily.NANUM_REGULAR
            }
            size={11}
            margin={[0, 0, 3, 0]}
          >
            {dayOfTheWeek(wod.date)}
          </T>
          <T
            color={
              today - day === 0
                ? ColorPalette.Main.TXT
                : ColorPalette.White.WHITE
            }
            align={TextAlign.CENTER}
            size={today - day === 0 ? 26 : 20}
            fontFamily={
              today - day === 0
                ? FontFamily.NANUM_BOLD
                : FontFamily.NANUM_REGULAR
            }
          >
            {day}
          </T>
        </Block>
      </Btn>
    </Block>
  );
};

export default DayButton;
