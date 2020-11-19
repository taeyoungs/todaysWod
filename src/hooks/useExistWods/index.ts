import { useEffect, useState } from 'react';
import useUser from 'hooks/useUser';
import api from 'api';

interface IProps {
  id: number;
  date: string;
  title: Record<string, string>;
}

const useExistWods = (): Array<IProps> => {
  const [existWods, setExistWods] = useState([]);
  const { token } = useUser();
  useEffect(() => {
    api.getWods(token, { period: 'month' }).then((res) => {
      setExistWods(res.data);
    });
  }, []);

  return existWods;
};

export default useExistWods;
