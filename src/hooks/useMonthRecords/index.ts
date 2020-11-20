import { useEffect, useState } from 'react';
import useUser from 'hooks/useUser';
import api from 'api';
import { IReservationProps } from 'models/common';

const useMonthRecords = (
  year: number,
  month: number
): Array<IReservationProps> => {
  const [records, setRecords] = useState([]);
  const { token } = useUser();

  useEffect(() => {
    api.getMonthRecords(token, { period: `${year}-${month}` }).then((res) => {
      setRecords(res.data);
    });
  }, [month]);

  return records;
};

export default useMonthRecords;
