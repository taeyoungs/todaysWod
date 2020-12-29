import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StatusBar,
} from 'react-native';
import T from 'components/atoms/T';
import Scroll from 'components/molecules/Scroll';
import Flex from 'components/molecules/Flex';
import Block from 'components/molecules/Block';
import Shadow from 'components/molecules/Shadow';
import Header from 'components/organisms/Header';
import DayButton from 'components/organisms/DayButton';
import WodList from 'components/organisms/WodList';
import useWods from 'hooks/useWods';
import useUserRetrieve from 'hooks/useUserRetrieve';
import { ColorPalette } from 'models/color';
import { HomeScreenProps } from 'models/types';
import { checkTodayIdx, wait } from 'utils';

const { width } = Dimensions.get('screen');

interface IProps {
  navigation: HomeScreenProps['navigation'];
}

const Home: React.FC<IProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [today, setToday] = useState(new Date().getDate());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offsetX, setOffsetX] = useState(0); // dayButton offset
  const [offsetWodX, setOffsetWodX] = useState(0); // Wod offset
  const svRef = useRef<ScrollView>(null);
  const wodRef = useRef<ScrollView>(null);
  const wods = useWods(refreshing);
  useUserRetrieve(refreshing);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(300).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    // wods arr 중에서 오늘 날짜에 해당하는 idx
    const idx = checkTodayIdx(wods);

    // Page Wod
    if (idx > 0) {
      const toX = idx * width;
      wodRef.current?.scrollTo({ x: toX, y: 0, animated: false });
      setOffsetWodX(toX);
    }
    // Day Button
    if (idx > 0) {
      const toX = idx * 67;
      svRef.current?.scrollTo({ x: toX, y: 0, animated: false });
      setOffsetX(toX);
      setCurrentIndex(idx);
      setToday(new Date().getDate());
    }
    // else if (idx <= 2 && idx > 0) {
    //   const toX = idx * 67;
    //   svRef.current?.scrollTo({ x: toX, y: 0, animated: false });
    //   setOffsetX(toX);
    //   setCurrentIndex(idx);
    //   setToday(new Date().getDate());
    // }
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
    const d = new Date(wods[idx].date);
    setToday(d.getDate());
    setCurrentIndex(idx);
  };

  return (
    <>
      <Header
        title="와드"
        iconName="list"
        goMembership={() => navigation.navigate('Membership')}
      />
      <Scroll
        refreshing={refreshing}
        onRefresh={onRefresh}
        backgroundColor={ColorPalette.White.SMOKE}
        refreshColor={ColorPalette.Main.BG}
      >
        <StatusBar barStyle="light-content" />
        {wods.length > 0 ? (
          <>
            <Block
              width={'100%'}
              margin={[0, 0, 20, 0]}
              backgroundColor={ColorPalette.White.SMOKE}
              padding={[10, 0]}
            >
              <Block margin={[0, 0, 10, 0]}>
                <T size={12} color={ColorPalette.Main.BG}>
                  {wods[currentIndex]?.date.split('-')[1]}월
                </T>
              </Block>
              <ScrollView
                style={{
                  height: 80,
                }}
                horizontal
                scrollEventThrottle={25}
                ref={svRef}
                scrollEnabled={false}
                contentContainerStyle={{
                  paddingLeft: 159,
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
                marginBottom: 30,
                height: 450,
              }}
              horizontal
              scrollEventThrottle={25}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScrollEndDrag={handleScroll}
              ref={wodRef}
            >
              {wods &&
                wods.map((wod, index) => (
                  <Shadow width={width} key={index}>
                    <WodList wod={wod} />
                  </Shadow>
                ))}
            </ScrollView>
          </>
        ) : (
          <Flex backgroundColor={ColorPalette.White.TANSPARENT}>
            <T>등록된 와드가 없습니다. 😴</T>
          </Flex>
        )}
      </Scroll>
    </>
  );
};

export default Home;
