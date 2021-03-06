import { useEffect } from 'react';
import useUser from 'hooks/useUser';
import useAlertActions from 'hooks/useAlertActions';
import useUserActions from 'hooks/useUserActions';
import useAlert from 'hooks/useAlert';
import api from 'api';

const useAlerts = (refreshing: boolean, isFocused: boolean): void => {
  const { page } = useAlert();
  const { token } = useUser();
  const { onSetAlerts } = useAlertActions();
  const { onSetHasNewAlert } = useUserActions();

  useEffect(() => {
    isFocused &&
      api
        .getAlerts(token, 1)
        .then((res) => {
          const form = {
            alerts: res.data.results,
            page: 1,
            count: res.data.count,
          };
          onSetAlerts(form);
        })
        .then(() => onSetHasNewAlert(false));
  }, [isFocused]);
  useEffect(() => {
    refreshing &&
      api
        .getAlerts(token, 1)
        .then((res) => {
          const form = {
            alerts: res.data.results,
            page: 1,
            count: res.data.count,
          };
          onSetAlerts(form);
        })
        .then(() => onSetHasNewAlert(false));
  }, [refreshing]);
  useEffect(() => {
    page != 1 &&
      api.getAlerts(token, page).then((res) => {
        const form = {
          alerts: res.data.results,
          count: res.data.count,
        };
        onSetAlerts(form);
      });
  }, [page]);
};

export default useAlerts;
