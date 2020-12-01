import React, { useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
} from 'react-native';
import T from 'components/atoms/T';
import Flex from 'components/molecules/Flex';
import Header from 'components/organisms/Header';
import Block, { Sort } from 'components/molecules/Block';
import AlertItem from 'components/organisms/AlertItem';
import useAlerts from 'hooks/useAlerts';
import useAlert from 'hooks/useAlert';
import useAlertActions from 'hooks/useAlertActions';
import { ColorPalette } from 'models/color';
import { HomeScreenProps } from 'models/types';
import { wait } from 'utils';

interface IProps {
  navigation: HomeScreenProps['navigation'];
}

const { width } = Dimensions.get('screen');

const Alerts: React.FC<IProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { alerts, count, page } = useAlert();
  const { onIncreasePage } = useAlertActions();
  useAlerts(refreshing);

  const onRefresh = () => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    if (contentSize.height < layoutMeasurement.height + contentOffset.y) {
      if (page * 6 < count && (page + 1) * 6 >= count) {
        onIncreasePage();
      }
    }
  };

  return (
    <>
      <Header goMembership={() => navigation.navigate('Membership')} />
      <ScrollView
        showsVerticalScrollIndicator={false}
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
          margin={[40, 20, 20, 20]}
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
    </>
  );
};

export default Alerts;
