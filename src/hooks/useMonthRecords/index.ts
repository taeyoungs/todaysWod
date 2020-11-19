import { useEffect, useState } from 'react';
import useUser from 'hooks/useUser';
import api from 'api';
import { IReservationProps } from 'models/common';

const useMonthRecords = (): Array<IReservationProps> => {
  const [records, setRecords] = useState([]);
  const { token } = useUser();

  useEffect(() => {
    api.getMonthRecords(token).then((res) => {
      setRecords(res.data);
    });
  }, []);

  return records;
};

export default useMonthRecords;
