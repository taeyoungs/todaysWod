import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'components/atoms/Icon';
import T from 'components/atoms/T';
import Btn from 'components/atoms/Button';
import Scroll from 'components/molecules/Scroll';
import Block, { FlexDirection } from 'components/molecules/Block';
import DayButton from 'components/organisms/DayButton';
import WodList from 'components/organisms/WodList';
import useWods from 'hooks/useWods';
import { ColorPalette } from 'models/color';
import { HomeScreenProps } from 'models/types';
import { checkTodayIdx, wait } from 'utils';

const { width } = Dimensions.get('screen');

interface IProps {
  navigation: HomeScreenProps['navigation'];
}

const Home: React.FC<IProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [today, setToday] = useState(new Date(Date.now()).getDate());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetWodX, setOffsetWodX] = useState(0);
  const svRef = useRef<ScrollView>(null);
  const wodRef = useRef<ScrollView>(null);
  const wods = useWods(refreshing);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    const idx = checkTodayIdx(wods);

    if (idx > 0) {
      const toX = idx * width;
      wodRef.current?.scrollTo({ x: toX, y: 0, animated: false });
      setOffsetWodX(toX);
    }

    if (idx > 2) {
      const toX = (idx - 2) * 67;
      svRef.current?.scrollTo({ x: toX, y: 0, animated: false });
      setOffsetX(toX);
      setCurrentIndex(idx);
      setToday(new Date(Date.now()).getDate());
    }
  }, [wods]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { x } = event.nativeEvent.contentOffset;
    const idx = Math.abs(Math.round(x / width));

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
    if (idx - currentIndex > 0) {
      setToday((prevState) => prevState + (idx - currentIndex));
    } else if (idx - currentIndex < 0) {
      setToday((prevState) => prevState - Math.abs(idx - currentIndex));
    }
  };

  return (
    <Scroll refreshing={refreshing} onRefresh={onRefresh}>
      <StatusBar barStyle="light-content" />
      <Block width={'100%'} margin={[0, 0, 20, 0]}>
        <T margin={[35, 0, 10, 0]} color={ColorPalette.Main.TXT} size={14}>
          {wods[currentIndex]?.date.split('-')[1]}월
        </T>
        <ScrollView
          style={{
            height: 80,
          }}
          horizontal
          scrollEventThrottle={25}
          ref={svRef}
          scrollEnabled={false}
          contentContainerStyle={{
            marginLeft: 25,
            paddingRight: 174,
          }}
        >
          {wods.length > 0 &&
            wods.map((wod, index) => (
              <DayButton
                key={index}
                svRef={svRef}
                wodRef={wodRef}
                wod={wod}
                idx={index}
                today={today}
                offsetX={offsetX}
                currentIndex={currentIndex}
                offsetWodX={offsetWodX}
                setOffsetWodX={setOffsetWodX}
                setToday={setToday}
                setOffsetX={setOffsetX}
                setCurrentIndex={setCurrentIndex}
              />
            ))}
        </ScrollView>
      </Block>
      <ScrollView
        style={{
          flexGrow: 1,
          width: '100%',
          marginBottom: 10,
          height: 400,
        }}
        horizontal
        scrollEventThrottle={25}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScrollEndDrag={handleScroll}
        ref={wodRef}
      >
        {wods && wods.map((wod, index) => <WodList wod={wod} key={index} />)}
      </ScrollView>
      <Block height={'120px'} padding={[20]} margin={[0, 0, 20, 0]}>
        <Btn onPress={() => navigation.navigate('Membership')}>
          <Block
            backgroundColor={ColorPalette.White.WHITE}
            width={'100%'}
            height={'100%'}
            borderRadius={[10]}
            flexDirection={FlexDirection.ROW}
          >
            <T color={ColorPalette.Main.BG_DARK} margin={[10]}>
              회원권 정보
            </T>
            <Icon name="barcode" size={26} color={ColorPalette.Main.BG_DARK} />
          </Block>
        </Btn>
      </Block>
    </Scroll>
  );
};

export default Home;
