import { useEffect, useState } from 'react';
import useUser from 'hooks/useUser';
import api from 'api';

interface IProps {
  id: number;
  date: string;
  title: Record<string, string>;
}

const useExistWods = (
  year: number,
  month: number,
  refreshing: boolean
): Array<IProps> => {
  const [existWods, setExistWods] = useState([]);
  const { token } = useUser();
  useEffect(() => {
    api.getWods(token, { period: `${year}-${month}` }).then((res) => {
      setExistWods(res.data);
    });
  }, [month]);
  useEffect(() => {
    refreshing &&
      api.getWods(token, { period: `${year}-${month}` }).then((res) => {
        setExistWods(res.data);
      });
  }, [refreshing]);

  return existWods;
};

export default useExistWods;
