import { useEffect, useState } from 'react';
import useUser from 'hooks/useUser';
import api from 'api';
import { IWodProps } from 'models/common';

const useWods = (refreshing: boolean): Array<IWodProps> => {
  const [wods, setWods] = useState([]);
  const { token } = useUser();

  useEffect(() => {
    api.getWods(token).then((res) => {
      setWods(res.data);
    });
  }, []);
  useEffect(() => {
    refreshing &&
      api.getWods(token).then((res) => {
        setWods(res.data);
      });
  }, [refreshing]);

  return wods;
};

export default useWods;
