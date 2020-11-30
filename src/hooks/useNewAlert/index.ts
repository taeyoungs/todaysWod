import { useEffect } from 'react';
import useUser from 'hooks/useUser';
import useAlertActions from 'hooks/useAlertActions';
import api from 'api';

const useNewAlert = (refreshing: boolean): void => {
  const { userId } = useUser();
  const { onSetNewAlert } = useAlertActions();
  useEffect(() => {
    api.getUser(userId).then((res) => {
      onSetNewAlert(res.data.has_new_alert);
    });
  }, [refreshing]);
};

export default useNewAlert;
