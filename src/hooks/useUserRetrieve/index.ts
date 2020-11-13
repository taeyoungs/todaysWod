import api from 'api';
import useUser from 'hooks/useUser';
import useUserActions from 'hooks/useUserActions';
import { IUserProps } from 'models/common';
import { useEffect, useState } from 'react';

const useUserRetrieve = (refreshing: boolean): IUserProps => {
  const [info, setInfo] = useState({});
  const { userId, boxId } = useUser();
  const { onUpdateRState } = useUserActions();

  useEffect(() => {
    api.getUser(userId).then((res) => {
      setInfo(res.data);
      onUpdateRState({ registrationState: res.data.registration_state });
    });
  }, [refreshing, boxId]);

  return info;
};

export default useUserRetrieve;
