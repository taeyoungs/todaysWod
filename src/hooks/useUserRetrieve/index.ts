import { useLayoutEffect } from 'react';
import useUser from 'hooks/useUser';
import useUserActions from 'hooks/useUserActions';
import api from 'api';

const useUserRetrieve = (refreshing: boolean): void => {
  const { userId } = useUser();
  const { onSetUser } = useUserActions();

  useLayoutEffect(() => {
    api.getUser(userId).then((res) => {
      onSetUser(res.data);
    });
  }, []);
  useLayoutEffect(() => {
    refreshing &&
      api.getUser(userId).then((res) => {
        onSetUser(res.data);
      });
  }, [refreshing]);
};

export default useUserRetrieve;
