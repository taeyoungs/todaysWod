import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { IReservationProps } from 'models/common';
import useReservationActions from 'hooks/useReservationActions';
import { isPassDate } from 'utils';

export interface IPastRProps {
  records: Array<IReservationProps>;
  recordsCnt: number;
  confirmCnt: number;
  canceledCnt: number;
  hasMore: boolean;
}

const usePastReservations = (month: number): IPastRProps => {
  const rSlice = useSelector((state: RootState) => state.reservationsSlice);
  const { getPastReservationPage } = useReservationActions();

  const thisMonth = new Date().getMonth() + 1;

  const pastReservations = rSlice.past.records;
  const pageSize = 6;
  let records: Array<IReservationProps> = [];
  let hasMore = false;
  if (month === thisMonth) {
    records = pastReservations.filter((r) => !isPassDate(r.date));
  } else {
    records = pastReservations;
  }
  if (records.length > getPastReservationPage() * pageSize) {
    records = records.slice(0, getPastReservationPage() * pageSize);
    hasMore = true;
  }

  // ToDo: 총 예약, 출석, 결석 수
  const recordsCnt = pastReservations.filter((r) => !isPassDate(r.date)).length;
  const confirmCnt = pastReservations.filter((r) => r.state === 'confirmed')
    .length;
  const canceledCnt = pastReservations.filter((r) => r.state === 'canceled')
    .length;

  return { records, recordsCnt, confirmCnt, canceledCnt, hasMore };
};

export default usePastReservations;
