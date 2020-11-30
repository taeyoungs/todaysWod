import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  IAlertActionProps,
  increasePage,
  setAlerts,
  setHasNewAlert,
} from 'store/alertsSlice';

const useAlertActions = () => {
  const dispatch = useDispatch();

  const onSetNewAlert = useCallback(
    (hasNewAlert: boolean) => dispatch(setHasNewAlert(hasNewAlert)),
    [dispatch]
  );

  const onSetAlerts = useCallback(
    (form: IAlertActionProps) => dispatch(setAlerts(form)),
    [dispatch]
  );

  const onIncreasePage = useCallback(() => dispatch(increasePage()), [
    dispatch,
  ]);

  return { onSetNewAlert, onSetAlerts, onIncreasePage };
};

export default useAlertActions;
