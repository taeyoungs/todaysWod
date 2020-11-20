import { useEffect, useState } from 'react';
import useUser from 'hooks/useUser';
import api from 'api';
import { IWodProps } from 'models/common';

const useWod = (date: string): Array<IWodProps> => {
  const [wod, setWod] = useState([]);
  const { token } = useUser();

  useEffect(() => {
    api.getWod(token, { date: date }).then((res) => {
      // console.log(res.data);
      setWod(res.data);
    });
  }, []);

  return wod;
};

export default useWod;
