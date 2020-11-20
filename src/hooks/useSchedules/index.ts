import api from 'api';
import useUser from 'hooks/useUser';
import { IScheduleProps } from 'models/common';
import { useEffect, useState } from 'react';

const useSchedules = (date: string): Array<IScheduleProps> => {
  const [schedules, setSchedules] = useState([]);
  const { token } = useUser();

  useEffect(() => {
    api.getSchedules(token, { date: date }).then((res) => {
      setSchedules(res.data);
    });
  }, []);

  return schedules;
};

export default useSchedules;
