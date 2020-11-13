import { useEffect, useState } from 'react';
import api from 'api';
import useUser from 'hooks/useUser';
import { IBoxProps } from 'models/common';

const useBoxRetrieve = (): IBoxProps => {
  const [info, setInfo] = useState({});
  const { boxId } = useUser();

  useEffect(() => {
    if (boxId) {
      api.getBox(boxId).then((res) => {
        setInfo(res.data);
      });
    }
  }, [boxId]);
  return info;
};

export default useBoxRetrieve;
