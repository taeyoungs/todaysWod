import { useEffect } from 'react';
import useUser from 'hooks/useUser';
import useReservationActions from 'hooks/useReservationActions';
import api from 'api';

const useMonthRecords = (
  year: number,
  month: number,
  isCalendar: boolean,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  const { token } = useUser();
  const { onSetReservations, onSetPastReservations } = useReservationActions();

  useEffect(() => {
    api.getMonthRecords(token, { period: `${year}-${month}` }).then((res) => {
      if (isCalendar) {
        onSetReservations({ month, reservations: res.data });
      } else {
        onSetPastReservations(res.data);
        setLoading && setLoading(false);
      }
    });
  }, [month]);
};

export default useMonthRecords;
