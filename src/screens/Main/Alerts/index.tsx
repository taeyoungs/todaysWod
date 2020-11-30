import React, { useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
} from 'react-native';
import T from 'components/atoms/T';
import Flex from 'components/molecules/Flex';
import Block, { Sort } from 'components/molecules/Block';
import AlertItem from 'components/organisms/AlertItem';
import useAlerts from 'hooks/useAlerts';
import { ColorPalette } from 'models/color';
import { wait } from 'utils';
import useAlert from 'hooks/useAlert';
import useAlertActions from 'hooks/useAlertActions';

interface IProps {}

const { width } = Dimensions.get('screen');

const Alerts: React.FC<IProps> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { alerts, count, page } = useAlert();
  const { onIncreasePage } = useAlertActions();
  useAlerts(refreshing);

  const onRefresh = () => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // console.log(event.nativeEvent.contentOffset.y);
    // console.log(event.nativeEvent.layoutMeasurement.height);
    // flex 사이즈
    // console.log(event.nativeEvent.contentSize.height);
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    if (contentSize.height < layoutMeasurement.height + contentOffset.y) {
      // console.log(page * 6 < count);
      // console.log((page + 1) * 6 >= count);
      if (page * 6 < count && (page + 1) * 6 >= count) {
        onIncreasePage();
      }
      console.log(
        contentOffset.y,
        layoutMeasurement.height,
        contentSize.height
      );
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={ColorPalette.Main.BG_DARK}
        />
      }
      onScrollEndDrag={handleScrollEnd}
      scrollEventThrottle={25}
      style={{ backgroundColor: ColorPalette.White.SMOKE }}
    >
      <Flex
        backgroundColor={ColorPalette.White.SMOKE}
        margin={[50, 20, 20, 20]}
        width={`${width - 40}px`}
        sort={alerts.length === 0 ? Sort.CENTER_CENTER : Sort.CENTER_TOP}
      >
        {alerts.length === 0 && (
          <Block>
            <T>👋 새로운 알림이 없습니다.</T>
          </Block>
        )}
        {alerts &&
          alerts.map((alert) => <AlertItem alert={alert} key={alert.id} />)}
      </Flex>
    </ScrollView>
  );
};

export default Alerts;
