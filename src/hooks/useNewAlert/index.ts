import { useEffect } from 'react';
import useUser from 'hooks/useUser';
import useUserActions from 'hooks/useUserActions';
import api from 'api';

const useNewAlert = (refreshing: boolean): void => {
  const { userId } = useUser();
  const { onSetNewAlert } = useUserActions();
  useEffect(() => {
    api.getUser(userId).then((res) => {
      onSetNewAlert(res.data.has_new_alert);
    });
  }, [refreshing]);
};

export default useNewAlert;
