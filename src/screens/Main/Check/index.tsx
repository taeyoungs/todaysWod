import React, { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import Btn from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import T, { FontFamily, TextAlign } from 'components/atoms/T';
import Transparent from 'components/molecules/Transparent';
import Block, { FlexDirection } from 'components/molecules/Block';
import Shadow from 'components/molecules/Shadow';
import useReservationActions from 'hooks/useReservationActions';
import useUser from 'hooks/useUser';
import { ColorPalette } from 'models/color';
import { CheckScreenProps } from 'models/types';
import { formatTime } from 'utils';
import api from 'api';

const { width } = Dimensions.get('screen');

interface IProps {
  navigation: CheckScreenProps['navigation'];
  route: CheckScreenProps['route'];
}

const Check: React.FC<IProps> = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const { date, schedule } = route.params;
  const {
    getReservation,
    onSetReservation,
    onUpdateReservation,
  } = useReservationActions();
  const { token } = useUser();

  const reservation = getReservation(date);

  const back = () => navigation.goBack();

  const handleUpdateReservation = async () => {
    try {
      setLoading(true);
      const form = {
        schedule_id: `${schedule.id}`,
      };
      if (reservation) {
        const results = await api.updateReservation(
          token,
          form,
          reservation.id
        );
        if (results.status === 200) {
          const data = {
            month: parseInt(date.split('-')[1]),
            reservation: results.data,
          };
          onUpdateReservation(data);
          navigation.popToTop();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetReservation = async () => {
    try {
      setLoading(true);
      const form = {
        date,
        schedule_id: `${schedule.id}`,
      };
      const results = await api.setNewReservation(token, form);
      // console.log(results.data);
      if (results.status === 201) {
        const data = {
          month: parseInt(date.split('-')[1]),
          reservation: results.data,
        };
        onSetReservation(data);
        navigation.popToTop();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      cardStyle: { backgroundColor: 'transparent' },
      cardOverlayEnabled: true,
    });
  }, []);

  const ConditionButton = ({
    text,
    onPress,
  }: {
    text: string;
    onPress(): Promise<void>;
  }) => {
    return (
      <Btn onPress={onPress}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <T
            align={TextAlign.CENTER}
            color={ColorPalette.Main.BG_DARK}
            fontFamily={FontFamily.NANUM_BOLD}
          >
            {text}
          </T>
        )}
      </Btn>
    );
  };

  return (
    <Transparent back={back}>
      <Block
        margin={[80, 20, 0, 20]}
        width={`${width - 40}px`}
        backgroundColor={ColorPalette.White.SMOKE}
        height={'70%'}
      >
        {reservation ? (
          <>
            <Block flexDirection={FlexDirection.ROW} margin={[0, 0, 15, 0]}>
              <Icon
                name="information-circle-outline"
                size={16}
                color={ColorPalette.Gray.GRAY}
              />
              <T margin={[0, 5]} color={ColorPalette.Gray.GRAY} size={12}>
                기존 예약이 이미 존재합니다.
              </T>
            </Block>
            <Shadow>
              <Block
                backgroundColor={ColorPalette.White.WHITE}
                width={'90%'}
                flexDirection={FlexDirection.ROW}
                padding={[30, 0]}
              >
                <Block width={'50%'}>
                  <Block margin={[0, 0, 20, 0]}>
                    <T
                      color={ColorPalette.Gray.GRAY}
                      size={12}
                      margin={[0, 0, 10, 0]}
                    >
                      변경 전
                    </T>
                    <T size={18}>
                      {formatTime(reservation.schedule.start_time)}
                    </T>
                    <T size={18}>-</T>
                    <T size={18}>{formatTime(reservation.schedule.end_time)}</T>
                  </Block>
                  <Block>
                    <T
                      color={ColorPalette.Gray.GRAY}
                      size={12}
                      margin={[0, 0, 10, 0]}
                    >
                      Coach
                    </T>
                    <T>{reservation.schedule.coach.last_name}</T>
                  </Block>
                </Block>
                <Block>
                  <T>→</T>
                </Block>
                <Block width={'50%'}>
                  <Block margin={[0, 0, 20, 0]}>
                    <T
                      color={ColorPalette.Gray.GRAY}
                      size={12}
                      margin={[0, 0, 10, 0]}
                    >
                      변경 후
                    </T>
                    <T size={18}>{formatTime(schedule.start_time)}</T>
                    <T size={18}>-</T>
                    <T size={18}>{formatTime(schedule.end_time)}</T>
                  </Block>
                  <Block>
                    <T
                      color={ColorPalette.Gray.GRAY}
                      size={12}
                      margin={[0, 0, 10, 0]}
                    >
                      Coach
                    </T>
                    <T>{schedule.coach.last_name}</T>
                  </Block>
                </Block>
              </Block>
            </Shadow>
          </>
        ) : (
          <>
            <Block flexDirection={FlexDirection.ROW} margin={[0, 0, 15, 0]}>
              <Icon
                name="information-circle-outline"
                size={16}
                color={ColorPalette.Gray.GRAY}
              />
              <T margin={[0, 5]} color={ColorPalette.Gray.GRAY} size={12}>
                원하시는 시간대가 맞는지 다시 한번 확인해주세요.
              </T>
            </Block>
            <Shadow>
              <Block
                backgroundColor={ColorPalette.White.WHITE}
                width={'90%'}
                flexDirection={FlexDirection.ROW}
                padding={[30, 0]}
              >
                <Block>
                  <Block margin={[0, 0, 20, 0]}>
                    <T
                      color={ColorPalette.Gray.GRAY}
                      size={12}
                      margin={[0, 0, 10, 0]}
                    >
                      시간대
                    </T>
                    <T size={18}>
                      {formatTime(schedule.start_time)} -{' '}
                      {formatTime(schedule.end_time)}
                    </T>
                  </Block>
                  <Block>
                    <T
                      color={ColorPalette.Gray.GRAY}
                      size={12}
                      margin={[0, 0, 10, 0]}
                    >
                      Coach
                    </T>
                    <T>{schedule.coach.last_name}</T>
                  </Block>
                </Block>
              </Block>
            </Shadow>
          </>
        )}
      </Block>
      <Block
        backgroundColor={ColorPalette.White.WHITE}
        margin={[0, 20]}
        width={`${width - 40}px`}
        height={'60px'}
        flexDirection={FlexDirection.ROW}
      >
        <Block width={'50%'} border={[0, 1, 0, 0]}>
          <Btn onPress={back}>
            <T align={TextAlign.CENTER} color={ColorPalette.Black.BLACK}>
              취소
            </T>
          </Btn>
        </Block>
        <Block width={'50%'}>
          {reservation ? (
            <ConditionButton onPress={handleUpdateReservation} text="변경" />
          ) : (
            <ConditionButton onPress={handleSetReservation} text="예약" />
          )}
        </Block>
      </Block>
    </Transparent>
  );
};

export default Check;
